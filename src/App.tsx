import React from "react";
import "./App.css";
import { PluginRoot } from "./plugin-root";
import { Sidebar } from "./sidebar";

function App() {
  if (window.location.search === "?sidebar") {
    return <Sidebar />
  } else if  (window.location.search === "") {
    return <PluginRoot />
  } else {
    return null;
  }
}

export default App;
