import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteArticle} from '../../AC'

import './Article.css'
import Comments from '../CommentList/CommentsList';

class Article extends Component {
  static propTypes = {
    articleData: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    }).isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  };

  render() {
    const {articleData} = this.props;
    const {articleNumber} = this.props;
    const {isOpen} = this.props;
    const {toggleOpen} = this.props;

    return (
      <div className='articleComponent'>
        <h3 className = 'articleTitle'>{articleNumber} - { articleData.title } </h3>
        <button className='showArticleBtn' onClick = {toggleOpen} >
          {isOpen ? 'close' : 'open'}
        </button>
        <button onClick={this.handleDelete}>Delete article</button>
        {this.getBody()}
      </div>
    )
  }

  handleDelete = () => {
    const {deleteArticle, articleData} = this.props;
    deleteArticle(articleData.id);
    console.log('deliting article');
  };

  getBody() {
    const {isOpen} = this.props;
    const {articleData} = this.props;

    if (!isOpen) {
      return null;
    }

    return (
    <section className='articleText'>{articleData.text}
      <Comments commentsData = {articleData.comments}/>
    </section>
    )
  }
}

export default connect(null, {deleteArticle})(Article);