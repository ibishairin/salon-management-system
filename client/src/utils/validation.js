// Frontend Validation Utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateName = (name) => {
  if (!name || name.trim() === "") return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (name.trim().length > 50) return "Name must be less than 50 characters";
  return null;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone)) return "Phone must be exactly 10 digits";
  return null;
};

export const validateServiceName = (name) => {
  if (!name || name.trim() === "") return "Service name is required";
  if (name.trim().length < 2) return "Service name must be at least 2 characters";
  if (name.trim().length > 100) return "Service name must be less than 100 characters";
  return null;
};

export const validateDescription = (description) => {
  if (!description || description.trim() === "") return "Description is required";
  if (description.trim().length < 10) return "Description must be at least 10 characters";
  if (description.trim().length > 500) return "Description must be less than 500 characters";
  return null;
};

export const validatePrice = (price) => {
  if (price === "" || price === null || price === undefined) return "Price is required";
  const numPrice = parseFloat(price);
  if (isNaN(numPrice) || numPrice < 0) return "Price must be a positive number";
  return null;
};

export const validateDuration = (duration) => {
  if (duration === "" || duration === null || duration === undefined) return "Duration is required";
  const numDuration = parseInt(duration);
  if (isNaN(numDuration) || numDuration < 15) return "Duration must be at least 15 minutes";
  if (numDuration > 480) return "Duration must be less than 480 minutes (8 hours)";
  return null;
};

export const validateDate = (date) => {
  if (!date) return "Date is required";
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) return "Date cannot be in the past";
  return null;
};

export const validateTime = (time) => {
  if (!time) return "Time is required";
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) return "Time must be in HH:MM format";
  return null;
};

export const validateTransactionId = (transactionId) => {
  if (!transactionId || transactionId.trim() === "") return "Transaction ID is required";
  if (transactionId.trim().length < 5) return "Transaction ID must be at least 5 characters";
  if (transactionId.trim().length > 50) return "Transaction ID must be less than 50 characters";
  return null;
};

// Form validation helper
export const validateForm = (fields) => {
  const errors = {};
  let isValid = true;

  for (const [fieldName, { value, validator }] of Object.entries(fields)) {
    const error = validator(value);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

export default {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateServiceName,
  validateDescription,
  validatePrice,
  validateDuration,
  validateDate,
  validateTime,
  validateTransactionId,
  validateForm,
};
