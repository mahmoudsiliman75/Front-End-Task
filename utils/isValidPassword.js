let isValidPassword = (password) => {
  let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return password.match(regex) ? true : false ;
};

export default isValidPassword;
