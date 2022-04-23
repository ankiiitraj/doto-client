import React, { useEffect } from "react"
import "./bar.css"

export default function NotifyTopBar() {

  useEffect(() => {
    var d = document;
    var x = !d.getElementById("razorpay-embed-btn-js");
    if (x) {
      var s = d.createElement("script");
      s.defer = !0;
      s.id = "razorpay-embed-btn-js";
      s.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
      d.body.appendChild(s);
    } else {
      var rzp = window["__rzp__"];
      rzp && rzp.init && rzp.init();
    }
  }, []);

  return <>
  <div style={{ padding: "5px", width: "100vw", display: "flex", justifyContent: "center", backgroundColor: "#a22de2"}}>
    <div style={{ margin: "auto 1px" }}>
      <span style={{ color: "#44003e", fontSize: "large", fontWeight: "bold" }}>
        doto is moving to a new address.
      </span><br/>
      <span>
        <a 
          className="top-bar-link" 
          style={{ color: "#4ceaa0", fontWeight: "bolder", fontSize: "x-large" }} 
          href="https://www.doto.co.in" 
          rel="noopener noreferrer"
          target="_blank">
          doto.co.in
        </a>
      </span>
    </div>
  </div>
  </>
}