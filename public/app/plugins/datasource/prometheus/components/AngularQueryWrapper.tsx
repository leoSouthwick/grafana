import React, { Component } from 'react';

import coreModule from 'app/core/core_module';

import PromQueryField from './PromQueryField';
import { PromQuery } from '../types';

interface Props {
  change: (query: PromQuery, index: number) => void;
  datasource: any;
  execute: () => void;
  index: number;
  query: PromQuery;
}

/**
 * Angular wrapper around the Prometheus query field
 */
class Editor extends Component<Props> {
  handleChangeQuery = (nextQuery: PromQuery) => {
    const { index, change } = this.props;
    let { query } = this.props;
    const edited = query.expr !== nextQuery.expr;
    if (edited && change) {
      query = { ...query, expr: nextQuery.expr };
      change(query, index);
    }
  };

  handlePressEnter = () => {
    const { execute } = this.props;
    if (execute) {
      execute();
    }
  };

  render() {
    const { datasource, query } = this.props;

    return (
      <div className="gf-form-input" style={{ height: 'initial' }}>
        <PromQueryField
          datasource={datasource}
          query={query}
          onQueryChange={this.handleChangeQuery}
          onExecuteQuery={this.handlePressEnter}
          history={[]}
        />
      </div>
    );
  }
}

coreModule.directive('promEditor', [
  'reactDirective',
  reactDirective => {
    return reactDirective(Editor, ['change', 'execute', 'query', 'datasource']);
  },
]);
