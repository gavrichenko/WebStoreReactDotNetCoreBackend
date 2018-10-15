import React, {Component} from 'react';
import {PropTypes} from 'prop-types'

import Article from '../Article/Article'

import {connect} from 'react-redux';
import {filtrateArticleSelector} from '../../selectors/index';

class ArticleList extends Component  {
  state = {
    openArticleId: null
  };

  static propTypes = {
    //from connect
    articleData: PropTypes.array.isRequired,
  };

  render() {
    const articleElements = this.props.articleData.map((el, index) => {
      return (
        <li key={el.id}>
          <Article
            articleData={el}
            articleNumber={index + 1}
            isOpen = {el.id === this.state.openArticleId}
            toggleOpen = {this.toggleOpenArticle(el.id)}
          />
        </li>
      )
    });

    return (
      <div className="articleListComponent">
        <ul>
          {articleElements}
        </ul>
      </div>
    )
  }

  toggleOpenArticle = openArticleId => () => {
    if (openArticleId === this.state.openArticleId) {
      return this.setState({openArticleId: null});
    }
    return this.setState({openArticleId});
  }
}

export default connect((state) => {
  return {articleData: filtrateArticleSelector(state)}
})(ArticleList);