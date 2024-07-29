import "./user.css";
import user from "./user.json";
import UserCard from './components/UserCard';

function App() {
  return (
    <div className="App">
      <UserCard name={user.name} age={user.age} phoneNumber={user.phoneNumber} address={user.address} />
    </div>
  );
}

export default App;
