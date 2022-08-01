// this services is used to just validate the passwrod 
// i.e it must contain 1 upper , 1 lower , 1 numberic and 1 special character

export const passwordValidation = (value) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s.).{8,15}$/.test(value) ? true : false;
};
