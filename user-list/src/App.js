import { useEffect, useState } from 'react';
import User from './components/User';

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setIsLoading(false))
  }, []);
  return (
    <>
      <h1>User List</h1>
      { isLoading ? <p>Loading...</p> :
      <ul>
        { users.map(user => <User key={user.id} name={user.name} />) }
      </ul> }
    </>
  );
}

export default App;
