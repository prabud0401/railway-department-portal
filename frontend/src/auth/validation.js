export const validateForm = (formData, isLogin) => {
  const errors = {};

  // Common validations for both login and signup forms
  if (!formData || !formData.username || !formData.username.trim()) {
    errors.username = 'Username is required';
  }
  if (!formData || !formData.password || !formData.password.trim()) {
    errors.password = 'Password is required';
  }

  // Additional validations for signup form
  if (!isLogin) {
    if (!formData || !formData.nicOrPassport || !formData.nicOrPassport.trim()) {
      errors.nicOrPassport = 'NIC or Passport is required';
    }
    if (!formData || !formData.phoneNumber || !formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    }
    if (!formData || !formData.email || !formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData || !formData.fullName || !formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData || !formData.confirmPassword || !formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};
