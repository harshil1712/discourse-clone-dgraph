import React  from 'react';
import { useAuth0 } from './auth0-context';
const query = `
query {
  queryUser {
    username
    email
  }
}
`

const url = "http://localhost:8080/graphql"

const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json"},
  body: JSON.stringify({ query })
};

fetch(url, opts)
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();
  console.log(user)
  return (
    <div>
      {!isLoading && !user && (
            <>
              <h1>Click Below!</h1>
              <button onClick={loginWithRedirect} className="button is-danger">
                Login
              </button>
            </>
          )}
          {/* this is the new section */}
          {!isLoading && user && (
            <>
              <h1>You are logged in!</h1>
              <p>Hello {user.name}</p>

              {user.picture && <img src={user.picture} alt="My Avatar" />}
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="button is-small is-dark"
              >
                Logout
          </button>
            </>
          )}
    </div>
  );
}

export default App;
