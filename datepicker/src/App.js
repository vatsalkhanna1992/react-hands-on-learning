import './App.css';
import { DatePicker } from './components/DatePicker';
import { useState } from "react";
import './styles.css'

function App() {

  const [value, setValue] = useState(new Date());

  return (
    <DatePicker value={value} onChange={setValue} />
  );
}

export default App;
