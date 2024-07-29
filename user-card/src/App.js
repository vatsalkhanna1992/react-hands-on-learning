import "./user.css";
import user from "./user.json";
import UserCard from './components/UserCard';
import UserCardClass from "./components/UserCardClass";

function App() {
  return (
    <div className="App">
      <UserCard name={user.name} age={user.age} phoneNumber={user.phoneNumber} address={user.address} />
      <br />
      <UserCardClass name={user.name} age={user.age} phoneNumber={user.phoneNumber} address={user.address} />
    </div>
  );
}

export default App;
