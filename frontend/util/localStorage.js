"use client";
const { useEffect, useState } = require("react");

export const useLocalStorage = () => {
  const [merchantId, setUniqueId] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUniqueId(localStorage.getItem("unique_id"));
      setRole(localStorage.getItem("role"));
    }
  }, []);
  return [merchantId, role];
};
