const REGEX = {
  email: /^[\w\.]+@([\w]+\.)+[\w]{2,7}$/,
  password: /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  phone: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
};
export default REGEX;
