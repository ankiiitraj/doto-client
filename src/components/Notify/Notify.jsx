import React from "react";
import "./notify.css";

const Notify = () => {
  return(
    <>
      <div className="notify-container">
        <span 
          style={{ fontWeight: "bolder" }}>
            COVID-19: {" "}
          </span>
        Stay safe, stay home and participate in the <b>Vaccination</b> drive
      </div>
    </>
  )
}

export default Notify;