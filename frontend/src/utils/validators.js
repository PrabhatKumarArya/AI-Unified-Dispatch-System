/**
 * Validate email address format
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate password strength (min 6 chars)
 */
export function isValidPassword(password) {
  return password && password.length >= 6;
}

/**
 * Validate full name (at least 2 chars)
 */
export function isValidName(name) {
  return name && name.trim().length >= 2;
}

/**
 * Validate phone number (10 digits)
 */
export function isValidPhone(phone) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
}

/**
 * Validate login form fields
 */
export function validateLoginForm({ email, password }) {
  const errors = {};
  if (!email) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email";
  if (!password) errors.password = "Password is required";
  else if (!isValidPassword(password))
    errors.password = "Password must be at least 6 characters";
  return errors;
}

/**
 * Validate registration form fields
 */
export function validateRegisterForm({ name, email, password, role }) {
  const errors = {};
  if (!name) errors.name = "Name is required";
  else if (!isValidName(name)) errors.name = "Name must be at least 2 characters";
  if (!email) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email";
  if (!password) errors.password = "Password is required";
  else if (!isValidPassword(password))
    errors.password = "Password must be at least 6 characters";
  if (!role) errors.role = "Please select a role";
  return errors;
}

/**
 * Validate create order form
 */
export function validateOrderForm({ pickupAddress, deliveryAddress, deliveryFee }) {
  const errors = {};
  if (!pickupAddress || pickupAddress.trim().length < 5)
    errors.pickupAddress = "Enter a valid pickup address";
  if (!deliveryAddress || deliveryAddress.trim().length < 5)
    errors.deliveryAddress = "Enter a valid delivery address";
  if (!deliveryFee || isNaN(deliveryFee) || Number(deliveryFee) <= 0)
    errors.deliveryFee = "Enter a valid delivery fee";
  return errors;
}
