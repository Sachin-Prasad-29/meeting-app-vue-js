export const passwordValidation= (value) =>{
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s.).{8,15}$/.test(value)) ? true: false;
}
