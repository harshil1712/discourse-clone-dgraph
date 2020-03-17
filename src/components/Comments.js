import React, { useState } from "react";
import CommentBox from './CommentBox';

const Comments = ({ replies, id }) => {
    console.log(replies)
  return (
    <div>
        { replies ? replies.map(d=>(<div key={d.id}>{d.text}</div>)):null}
      <CommentBox topicId={id} />
    </div>
  );
};

export default Comments;
