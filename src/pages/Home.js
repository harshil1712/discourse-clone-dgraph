import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Card from '../components/Card';

const CATEGORIES = gql`
    {
        queryCategory {
            name
            description
            topics {
                title
            }
        }
    }
`

const DisplayCards = ()=> {
    const {loading, error, data} = useQuery(CATEGORIES)
    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error while fetching data</p>
    return data.queryCategory.map(({name, description, topics}) => (
        <Card key={name} name={name} description={description} topics={topics} />
    ))
}

export default () => {
    return(
        <div className="container">
            <DisplayCards />
        </div>
    )
}