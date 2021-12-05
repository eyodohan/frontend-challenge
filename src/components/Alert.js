import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, stat }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [stat]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
