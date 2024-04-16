export const validateForm = (formData) => {
  const errors = {};

  // Validate each field
  if (!formData.nicOrPassport.trim()) {
    errors.nicOrPassport = 'NIC or Passport is required';
  }
  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone Number is required';
  }
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  }
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  }
  if (!formData.username.trim()) {
    errors.username = 'Username is required';
  }
  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  }
  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
