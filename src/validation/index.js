// Regexes
const usernameRegex = /^[A-Za-z0-9_-]{4,16}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default {
  isUsernameValid(username) {
    return username.match(usernameRegex);
  },
  isPasswordValid(password) {
    return password.match(passwordRegex);
  },
  isEmailValid(email) {
    return email.match(emailRegex);
  },
};
