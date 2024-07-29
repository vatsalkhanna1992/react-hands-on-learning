import { useState } from "react";

function NameWithCounter() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  function decrementAge(e) {
    e.preventDefault();
    if (age > 0) {
      setAge(age - 1);
    }
  }

  function incrementAge(e) {
    e.preventDefault();
    setAge(age + 1);
  }

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <div>
        <button onClick={decrementAge}>-</button>{age}<button onClick={incrementAge}>+</button>
      </div>
      <div>
        My name is {name} and I am {age} years old.
      </div>
    </form>
  );
}

export default NameWithCounter;