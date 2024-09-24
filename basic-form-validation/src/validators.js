export const validateEmail = (email) => {
  const errors = [];
  if (email.length === 0) {
    errors.push("Email is required.");
  }
  else if (!email.endsWith('@webdevsimplified.com')) {
    errors.push('Must end with @webdevsimplified.com.');
  }
  return errors;
}

export const validatePassword = (pwd) => {
  const errors = [];
  if (pwd === '') {
    errors.push('Password is required.')
  }
  else if (pwd.length < 10) {
    errors.push('Password length should be greater than 10.')
  }
  else if (!hasLowerCase(pwd)) {
    errors.push('Password length should have a lowercase character')
  }
  else if (!hasUpperCase(pwd)) {
    errors.push('Password length should have an uppercase character')
  }
  else if (!hasNumber(pwd)) {
    errors.push('Password length should contain a number')
  }

  return errors;
}

const hasLowerCase = (str) => {
  return str.toUpperCase() !== str;
}

const hasUpperCase = (str) => {
  return str.toLowerCase() !== str;
}

const hasNumber = (str) => {
  return /\d/.test(str);
}
