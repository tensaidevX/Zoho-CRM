import Styles from "../assets/css/loader.module.css";
import React from "react";

function Loader() {
  return (
    <div className={Styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
