import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" style={styles.link}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "5rem",
    color: "#ff6347",
  },
  message: {
    fontSize: "1.5rem",
    color: "#333",
  },
  link: {
    display: "inline-block",
    marginTop: "20px",
    fontSize: "1rem",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default NotFound;
