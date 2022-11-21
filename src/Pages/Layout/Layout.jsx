import React, { useEffect, useState } from "react";
import Topbar from "../Topbar/Topbar";
import { Outlet, useParams } from "react-router-dom";

export default function Layout({ isLoggedIn, logOutUser }) {
  let params = useParams();
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(document.location.pathname);
  }, [params]);

  return (
    <>
      <Topbar isLoggedIn={isLoggedIn} logOutUser={logOutUser}/>
      {path === "/" && isLoggedIn ? (
        <Outlet />
      ) : (
        <div className="container my-3">
          <Outlet />
        </div>
      )}
    </>
  );
}
