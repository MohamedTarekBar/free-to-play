import React, { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "page not found";
  }, []);

  return (
    <div className="row h-100">
      <div className="col"></div>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="404 display-1">404</div>
        <h4>this page may be broken or removed</h4>
      </div>
    </div>
  );
}
