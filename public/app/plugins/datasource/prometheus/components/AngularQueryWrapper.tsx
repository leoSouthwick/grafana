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

interface State {
  query: PromQuery;
  edited: boolean;
}

/**
 * Angular wrapper around the Prometheus query field
 */
class Editor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      edited: false,
      query: props.query,
    };
  }

  handleChangeQuery = (nextQuery: PromQuery) => {
    const { index, change } = this.props;
    let { query } = this.state;
    const edited = query.expr !== nextQuery.expr;
    query = { ...query, expr: nextQuery.expr };
    this.setState({ edited, query });
    if (change) {
      change(nextQuery, index);
    }
  };

  handlePressEnter = () => {
    const { execute } = this.props;
    if (execute) {
      execute();
    }
  };

  render() {
    const { datasource } = this.props;
    const { edited, query } = this.state;

    return (
      <div className="gf-form-input" style={{ height: 'initial' }}>
        <PromQueryField
          datasource={datasource}
          query={edited ? null : query}
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
