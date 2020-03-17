import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import Like from "../components/Like";
import Comments from "../components/Comments"

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
      replies{
        text
        id
      }
    }
  }
`;

export default ({ match }) => {
  const topicID = match.params.id;
  const { loading, error, data } = useQuery(GET_TOPIC, {
    variables: { topicID }
  });

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
      <div className="title is-parent is-vertical">
        <article className="tile is-child is-10">
          <span className="tag is-primary">{data.getTopic.category.name}</span>
          <h1 className="is-size-1 is-capitalized">{data.getTopic.title}</h1>
          <p className="subtitle is-5">{data.getTopic.text}</p>
          <span>
            <figure className="image is-32x32">
              <img
                className="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </figure>
            <p className="is-size-7 has-text-weight-light">
              {data.getTopic.user.username}
            </p>
          </span>
          <Like />
        </article>
      </div>
      <br />
      <h5 className="subtitle is-5">Replies</h5>
      <hr />
      <Comments replies={data.getTopic.replies} id={topicID} />
    </div>
  );
};
