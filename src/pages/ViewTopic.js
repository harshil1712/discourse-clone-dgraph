import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "../auth0-context";
import Comments from "../components/Comments";

const GET_TOPIC = gql`
  query TOPIC($topicID: ID!) {
    getTopic(id: $topicID) {
      title
      text
      category {
        name
      }
      user {
        username
      }
      likes
      replies {
        text
        id
        user {
          username
        }
      }
    }
  }
`;

const DELETE_TOPIC = gql`
  mutation TOPIC($topicID: ID!){
    deleteTopic(filter:{id:[$topicID]}){
      msg
    }
  }
`

export default ({ match }) => {
  const topicID = match.params.id;
  const {user, isAuthenticated} = useAuth0()
  const AuthUsername = isAuthenticated? user.name:null

  let history = useHistory()
  const [deleteTopic] = useMutation(DELETE_TOPIC)
  const { loading, error, data } = useQuery(GET_TOPIC, {
    variables: { topicID }
  });

  const handleDelete = (e) =>{
    e.preventDefault()
    console.log(AuthUsername)
    console.log(data.getTopic.user.username)
    if(data.getTopic.user.username === AuthUsername){
      deleteTopic({variables:{topicID}})
      history.push("/")
    } else {
      alert("You're not authorised to delete this topic.")
    }
  }

  console.log(data);

  if (loading) return null;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <Link className="button" to="/create">
          Create New Topic
        </Link>
      </div>
          <h2 className="is-size-2 is-capitalized">{data.getTopic.title}</h2>
          <span className="tag is-primary">{data.getTopic.category.name}</span>
          <hr />
          <article className="media">
            <figure className="media-left">
              <span className="image is-48x48">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </span>
            </figure>
            <div className="media-content">
              <div className="content">
                <p className="is-size-6"><strong>{data.getTopic.user.username}</strong></p>
                <p className="subtitle is-5">{data.getTopic.text}</p>
              </div>
            </div>
            <div className="media-right">
              <button className="button is-small" onClick={(e)=>handleDelete(e)}>Delete</button>
            </div>
          </article>
      <br />
      <h5 className="subtitle is-5">Replies</h5>
      <Comments replies={data.getTopic.replies} id={topicID} />
    </div>
  );
};
