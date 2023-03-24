import React from "react";
import { Route, Routes } from "react-router";
import RouteList from "./Routes";

const RouterComponent = () => {
  return (
    <Routes>
      {RouteList.map((route, i) => (
        <Route {...route} key={i}></Route>
      ))}
    </Routes>
  );
};

export default RouterComponent;
