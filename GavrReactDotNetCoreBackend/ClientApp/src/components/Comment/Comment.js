import React from 'react';
import PropTypes from 'prop-types';

function Comment({comment}) {
  return (
    <div className="commentBody">
      <p>
        {comment.text}
        <b>
          by {comment.user}
        </b>
      </p>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired
};

export default Comment