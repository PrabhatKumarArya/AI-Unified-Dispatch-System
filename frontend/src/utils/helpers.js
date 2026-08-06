/**
 * Format a date string or Date object to a readable format
 */
export function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export function timeAgo(date) {
  if (!date) return "N/A";
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

/**
 * Truncate an order ID to last 6 characters
 */
export function shortOrderId(id) {
  if (!id) return "N/A";
  return `#${id.slice(-6).toUpperCase()}`;
}

/**
 * Format currency in INR
 */
export function formatCurrency(amount) {
  if (!amount && amount !== 0) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

/**
 * Get initials from a name
 */
export function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Capitalize first letter of each word
 */
export function capitalize(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get the localStorage user object
 */
export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

/**
 * Get stored auth token
 */
export function getToken() {
  return localStorage.getItem("token") || null;
}
