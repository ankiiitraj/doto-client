import React from "react";
import "./footer.css";
import { DiReact, DiMongodb, DiGithubBadge } from "react-icons/di";
import { FaNode } from "react-icons/fa";
import { SiNetlify } from "react-icons/si";
import { GrHeroku } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="footer">
      <hr className="footer-hr" width="90%" />
      <div className="footer-wrapper">
        <div className="footer-logo-collection">
          <DiReact className="footer-logo" style={{ color: "#61dafb" }} />
          <FaNode className="footer-logo" style={{ color: "#026e00" }} />
          <DiMongodb className="footer-logo" style={{ color: "#13aa52" }} />
          <SiNetlify className="footer-logo" style={{ color: "#227aa9" }} />
          <GrHeroku className="footer-logo" style={{ color: "#79589f" }} />
          <DiGithubBadge className="footer-logo" style={{ color: "#608c9f" }} />
        </div>
        <div className="footer-repo">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            href="https://github.com/ankiiitraj/doto-client"
          >
            Source Code
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            href="https://github.com/ankiiitraj/doto-client/issues"
          >
            Getting Involved
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            href="https://github.com/ankiiitraj/doto-client/issues/new"
          >
            Report a bug{" "}
            <span role="img" aria-label="emoji">
              🐛
            </span>
          </a>
        </div>
      </div>
      <hr className="footer-hr" width="60%" />
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <span>
          Made with <span style={{ color: "#FF0000" }}>❤</span> by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ankiiitraj"
          >
            Ankit
          </a>
        </span>{" "}
        and Open Sourced.
      </div>
    </div>
  );
};

export default Footer;
