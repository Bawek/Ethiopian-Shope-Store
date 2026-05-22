// utils/formatDate.js
export const formatDate1 = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(date);
};

// utils/formatDate.js
import { format } from "date-fns";

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return format(date, "d MMMM, yyyy");
};
