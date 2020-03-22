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

// const FETCH_REPLY = gql`
//   query getReply
// `

const CommentBox = ({ topicId }) => {
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("")
  const { user: AuthUser } = useAuth0();
  const [addReply, {loading, data}] = useMutation(ADD_REPLY)

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
        await addReply({variables:{reply}})
        console.log(data)

      } else {
        setErr("Reply can't be empty")
      }

      setComment("")
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
      <button className={loading?"button is-primary is-loading":"button is-primary"} onClick={async e => await handleSubmit(e)}>
        Reply
      </button>
    </div>
    </form>
  );
};

export default CommentBox