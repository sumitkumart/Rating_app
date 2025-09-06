export const validatePassword = ( password ) =>
 /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test( password );

export const validateEmail = ( email ) =>
 /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email );

export const validateName = ( name ) => {
  return name && name.length >= 2 && name.length <= 60;
};

export const validateAddress = ( address ) => {
  return !address || address.length <= 400;
};

export const validateForm = ( data ) => {
  const errors = {};
  
  if (!validateName(data.name)) {
    errors.name = 'Name must be between 20-60 characters';
  }
  
  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validatePassword(data.password)) {
    errors.password = 'Password must be 8-16 characters with at least one uppercase letter and one special character';
  }
  
  if (!validateAddress(data.address)) {
    errors.address = 'Address must be 400 characters or less';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
