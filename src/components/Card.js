import React from 'react';

const Card = ({name, description, topics}) => {
    return(
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
                                {
                                    topics.map(({title}) => (
                                        <li key={title}><a href="#">{title}</a></li>
                                    ))
                                }
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Card