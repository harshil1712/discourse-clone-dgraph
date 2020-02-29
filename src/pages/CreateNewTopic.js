import React, { useState } from "react";
import { useAuth0 } from "../auth0-context";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

const ADD_TOPIC = gql`
  mutation addTopic($topic: AddTopicInput!) {
    addTopic(input: [$topic]) {
      topic{title}
    }
  }
`;

const CATEGORIES = gql`
  {
    queryCategory {
      name
    }
  }
`;

const CreateNewTopic = () => {
  const { user:AuthUser } = useAuth0();
  const email = AuthUser.email
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const topic = {
      title,
      text,
      user:{username:email},
      category:{name:categoryName}
  }

  const { data } = useQuery(CATEGORIES);
  const [addTopic] = useMutation(ADD_TOPIC)

  const history = useHistory()

  return (
    <div className="container">
      <br />
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Details..."
              onChange={e => setText(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select onChange={e => setCategoryName(e.target.value)} required>
                  <option value="" hidden>Select a category</option>
                {data.queryCategory.map(({ name }) => (
                  <option
                    key={name}
                    value={name}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          className="button is-primary"
          onClick={async e => {
            e.preventDefault();
            await addTopic({variables:{topic}});
            history.push("/")
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewTopic;
