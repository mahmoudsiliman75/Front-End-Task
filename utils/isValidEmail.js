let isValidEmail = (emailAddress) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailAddress.match(regex) ? true : false ;
};

export default isValidEmail;
