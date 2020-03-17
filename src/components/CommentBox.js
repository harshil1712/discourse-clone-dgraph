import React, {useState} from 'react'
import { useAuth0 } from "../auth0-context";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_REPLY = gql`
  mutation addReply($reply: AddReplyInput!) {
    addReply(input: [$reply]) {
      reply {text}
    }
  }
`;

const CommentBox = ({ topicId }) => {
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("")
  const { user: AuthUser } = useAuth0();
  const [addReply] = useMutation(ADD_REPLY)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!AuthUser) alert("Please Login to post yout reply");
    else {
      if (comment != "") {
        let reply ={
          text: comment,
          user: {username:AuthUser.email},
          isRepyTo: { id: topicId }
        }
        addReply({variables:{reply}})
        setErr("")
        setComment("")
      } else {
        setErr("Reply can't be empty")
      }
    }
  };
  return (
      <form>
    <div className="field">
      <div className="control">
        <textarea
          className="textarea"
          placeholder="Reply"
          onChange={e => {console.log(e.target.value); setComment(e.target.value); console.log('Comment ', comment)} }
        />
      </div>
      {err!=""? <div>{err}</div> : <br />}
      <button className="button is-primary" onClick={async e => await handleSubmit(e)}>
        Reply
      </button>
    </div>
    </form>
  );
};

export default CommentBox