import { useState } from "react";
import { validateEmail, validatePassword } from "./validators";

const StateForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  const emailErrors = afterFirstSubmit ? validateEmail(email) : [];
  const passwordErrors = afterFirstSubmit ? validatePassword(password) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setAfterFirstSubmit(true);

    const emailResults = validateEmail(email)
    const passwordResults = validatePassword(password)


    if (emailResults.length === 0 && passwordResults.length === 0) {
      alert("Success");
    }
  }

  return (
    <form className="form" onSubmit={ handleSubmit }>
      <div className={`form-group ${emailErrors.length > 0 ? "error" : "" }`}>
        <label className="label">Email</label>
        <input className="input" type="email" id="email" onChange={e => setEmail(e.target.value)} />
        { emailErrors.length > 0 && <div className="msg">{ emailErrors }</div> }
      </div>
      <div className={`form-group ${passwordErrors.length > 0 ? "error" : "" }`}>
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        />
        { passwordErrors.length > 0 && <div className="msg">{ passwordErrors }</div> }
      </div>
      <button className="btn" type="submit">Submit</button>
    </form>
  )
}

export default StateForm;
