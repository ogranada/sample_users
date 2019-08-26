import ReactDOM from "react-dom";
import React, { Component } from "react";
import { DataProvider } from "./dataProvider";
import { Application } from "./components/application/application";

import "./styles/main.scss";

const dataProvider = new DataProvider();

ReactDOM.render(
  <Application dataProvider={dataProvider} />,
  document.getElementById("main")
);
