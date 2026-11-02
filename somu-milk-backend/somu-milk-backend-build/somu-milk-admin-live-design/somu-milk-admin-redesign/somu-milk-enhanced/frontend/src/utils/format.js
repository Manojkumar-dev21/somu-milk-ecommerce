export const formatPrice = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return "";
  return `₹${number.toLocaleString("en-IN")}`;
};

export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* "5 minutes ago", "Yesterday", ... for notifications */
export const timeAgo = (date) => {
  if (!date) return "";

  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return "Today";
  if (seconds < 172800) return "Yesterday";

  return `${Math.floor(seconds / 86400)} days ago`;
};
