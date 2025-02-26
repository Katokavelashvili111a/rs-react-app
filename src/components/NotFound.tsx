import React from "react";
import './NotFound.css'; 

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
