export const validateTitle = (title) => {
  let errors = [];
  if (title.length === 0) {
    errors.push("Title is required");
  }
  else {
    errors = [];
  }
  return errors
}

export const validateBody = (body) => {
  let errors = [];
  if (body.length === 0) {
    errors.push("Body is required");
  }
  else {
    errors = [];
  }
  return errors
}

export const validateUser = (user) => {
  let errors = [];
  if (user.length === 0) {
    errors.push("User is required");
  }
  else {
    errors = [];
  }
  return errors
}