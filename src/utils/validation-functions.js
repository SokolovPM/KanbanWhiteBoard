export const validateEmail = email => {
  if (!email) {
    return 'This field is required';
  }
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase()) ? '' : 'Wrong email format';
};

export const validatePassword = password => {
  if (!password) {
    return 'This field is required';
  }
  if (password.length < 6) {
    return 'Password should not be less than 6 symbols';
  }
  return '';
};

export const validatePasswordDuplicate = (password, passwordDuplicate) => {
  if (!passwordDuplicate) {
    return 'This field is required';
  }
  if (password !== passwordDuplicate) {
    return "The repeated password doesn't equal to first one";
  }
  return '';
};
