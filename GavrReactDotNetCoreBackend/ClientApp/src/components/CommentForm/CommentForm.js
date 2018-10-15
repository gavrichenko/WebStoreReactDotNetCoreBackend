import React, {Component} from 'react';
import './CommentForm.css';


export default class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }

  render() {
    return (
      <div className="CommentForm">
        <form>
          <label>Name</label>
          <input type="text" name="firstname" placeholder="Your name.."/>
          <label>Comment's text</label>
          <textarea name="subject" placeholder="Write something.."></textarea>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }

}
