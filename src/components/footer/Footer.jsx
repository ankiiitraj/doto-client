import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-repo">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={"footer-link"}
            href="https://github.com/ankiiitraj/doto-client/issues"
          >
            <div className={"footer-div-small"}>
            getting involved {" "}
            <span role="img" aria-label="emoji" alt={"bug emoji"}>
              🎉
            </span>
            </div>
          </a>
          </div>

          <div style={{marginTop:"20px", textAlign: "center" }}>
        <span>
          made with <span style={{ color: "#FF0000" }}>❤</span> by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ankiiitraj"
            style={{textDecoration:"none"}}
          >
            <b>ankit</b>
          </a>
        </span>{" "}
        and open sourced
      </div>

      
          <div className="footer-repo">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={"footer-link"}
            href="https://github.com/ankiiitraj/doto-client/issues/new"
          >
            <div className={"footer-div-small"}>
            report a bug{" "}
            <span role="img" aria-label="emoji" alt={"bug emoji"}>
              🐛
            </span>
            </div>
          </a>
        </div>
      
     
      </div>
    </div>
  );
};

export default Footer;
