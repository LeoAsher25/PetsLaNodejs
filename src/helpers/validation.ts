const validationHelper = {
  isValidEmail: (email: string) => {
    const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return reg.test(email);
  },
  isValidUsername: (username: string) => {
    return /^([a-zA-Z0-9]){8,32}/.test(username);
  },
  isValidPassword: (password: string) => {
    return /^([a-zA-Z0-9]){8,32}/.test(password);
  },
};

export default validationHelper;
