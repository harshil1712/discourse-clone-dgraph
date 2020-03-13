import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, description, topics }) => {
  return (
    <div className="box">
      <div className="columns">
        <div className="column">
          <h3 className="is-size-4">{name}</h3>

          <div className="content">
            <p>{description}</p>
          </div>
        </div>
        <div className="column">
          <div className="content">
            <ul>
              {topics.map(({ title, id }) => (
                <li key={id}>
                  <Link to={`/topic/${id}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
