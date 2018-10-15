import React, {Component as ReactComponent} from 'react';

export default (OriginalComponent) => class WrappedComponent extends ReactComponent {
  render() {
    return <OriginalComponent {...this.props}/>
  }
}