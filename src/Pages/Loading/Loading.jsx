import React, { useEffect } from "react";

export default function Loading(params) {
  let isLoading = params.bool;

  useEffect(() => {
    if (isLoading) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
        document.body.style.height = "";
        document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="fullscreen-loading">
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
