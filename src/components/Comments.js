import React, { useState } from "react";
import CommentBox from "./CommentBox";

const Comments = ({ replies, id }) => {
  console.log(replies);
  return (
    <div>
      {replies
        ? replies.map(d => (
            <div key={d.id}>
              <hr />
              <article className="media" key={d.id}>
                <figure className="media-left">
                  <span className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                  </span>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p className="is-size-6 has-text-weight-light">
                      <strong>{d.user.username}</strong>
                    </p>
                    <p className="subtitle is-5">{d.text}</p>
                  </div>
                </div>
              </article>
            </div>
          ))
        : null}
        <br />
      <CommentBox topicId={id} />
    </div>
  );
};

export default Comments;
