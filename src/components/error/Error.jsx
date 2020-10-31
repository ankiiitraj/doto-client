import React from "react";
import {ReactComponent as Err} from "../data/error.svg";
const Error = () => {
  return(
    <>
      <div style={{maxWidth: "700px", margin: "1em auto", textAlign: "center"}}>
        <Err style={{width: "70%", height: "auto"}} />
        <div style={{fontSize: "xx-large"}}>
          Something went wrong! Try reloading . . .
        </div>
      </div>
    </>
  ) 
};

export default Error;
