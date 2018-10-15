import React, {Component} from 'react';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';

export default class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }

  render() {
    const {isOpen} = this.state;
    const buttonText = isOpen ? 'Hide comments' : 'Show comments';
    return (
      <div className="commentsList">
        <button onClick={this.toggleOpen}>{buttonText}</button>
        {this.getBody()}
      </div>
    )
  }

  getBody() {
    if (!this.state.isOpen) {
      return null;
    }
    const {commentsData} = this.props;

    if (!commentsData || !commentsData.length) {
      return <p> No comments yet </p>
    }

    const commentsElement = commentsData.map(el =>  <li key={el.id}> <Comment comment = {el}/> </li>);
    return (
      <div>
        <ul>
          {commentsElement}
        </ul>
        <CommentForm/>
      </div>
    )
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}
