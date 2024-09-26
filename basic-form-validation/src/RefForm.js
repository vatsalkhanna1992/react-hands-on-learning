import { useRef, useState } from "react";
import { validateEmail, validatePassword } from "./validators";

const RefForm = () => {

  const email = useRef('');
  const password = useRef('');

  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAfterFirstSubmit(true);

    const emailError = validateEmail(email.current.value)
    if (emailError.length > 0) {
      setEmailErrors(emailError);
    }
    const passwordError = validatePassword(password.current.value)
    if (passwordError.length > 0) {
      setPasswordErrors(passwordError);
    }

    if (emailError.length === 0 && passwordError.length === 0) {
      alert("Success");
    }
  }
  return (
    <form className="form" onSubmit={ handleSubmit }>
      <div className={`form-group ${emailErrors.length > 0 ? "error" : "" }`}>
        <label className="label">Email</label>
        <input className="input" type="email" id="email" ref={email} onChange={afterFirstSubmit ? ((e) => setEmailErrors(validateEmail(e.target.value))) : () => {}} />
        { emailErrors.length > 0 && <div className="msg">{ emailErrors }</div> }
      </div>
      <div className={`form-group ${passwordErrors.length > 0 ? "error" : "" }`}>
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          onChange={afterFirstSubmit ? ((e) => setPasswordErrors(validatePassword(e.target.value)))  : () => {}}
          ref={password}
        />
        { passwordErrors.length > 0 && <div className="msg">{ passwordErrors }</div> }
      </div>
      <button className="btn" type="submit">Submit</button>
    </form>
  )
}

export default RefForm;
