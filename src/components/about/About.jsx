import React from "react";
import "./about.css";
import { SiGithub, SiLinkedin } from "react-icons/si";

const About = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "max-content",
        minHeight: "100vh"
      }}
    >
      <div className="about-wrapper">
        <div className="what">
          <h1>What is Doto?</h1>
          <span>
            Doto is a progress tracking application on problem solving and DSA
            mastery. <br />
            Doto contains handpicked problems for DSA mastery by people at{" "}
            <b>
              FAANG{" "}
              <span className="emoji" role="img" aria-label="emoji">
                😇
              </span>
            </b>
            . <br />
            <small>
              P.S: The name Doto came from Todo! Sorry but I'm well known for
              manipulating strings{" "}
            </small>
            <span className="emoji" role="img" aria-label="emoji">
              😜
            </span>
            .
          </span>
        </div>
        <div className="why">
          <h1>Why Doto?</h1>
          <span>
            There's a story behind this and I'll try to cut it short. <br />
            So, I watched the video by <b>LOVE BABBAR</b> and decided to make
            tracking easier for me!
            <br />
            And yes that's the whole story{" "}
            <span className="emoji" role="img" aria-label="emoji">
              🤭 🤫 🤥
            </span>
            <br />
            Doto will be coming with more such lists!{" "}
            <span className="emoji" role="img" aria-label="emoji">
              🤩
            </span>
            .
          </span>
        </div>
        <div className="future">
          <h1>Future Plans?</h1>
          <span>
            <span className="emoji" role="img" aria-label="emoji">
              🤫
            </span>
            &nbsp;We're working on various new cool features for the community,
            Stay tuned!
            <br />
            Most notable of them is to build a sort of discussion forum where
            community can interact and learn at a whole new level.
          </span>
        </div>
        <div className="meet">
          <h1>
            Meet the people behind!{" "}
            <span className="emoji" role="img" aria-label="emoji">
              👨‍💻 👩‍💻
            </span>
          </h1>
          <div className="people">
            <div className="individual">
              <div
                className="individual-img"
                style={{
                  backgroundImage: "url(https://avatars.githubusercontent.com/u/48787278?v=4)",
                }}
              ></div>
              <h1 style={{fontSize:"x-large"}}>Ankit Raj</h1>
              <span>creator {"&"} open sorcerer</span>
              <div className="individual-social">
                <a
                  className="individual-social-github"
                  rel="noopener noreferrer"
                  target="_blank"
									href="https://github.com/ankiiitraj"
									style={{
                    color: "#a0979b"
									}}
                >
                  <SiGithub />
                </a>
                <a
                  className="individual-social-linkedin"
                  rel="noopener noreferrer"
                  target="_blank"
									href="https://linkedin.com/in/ankiiitraj"
									style={{
                    color: "#a0979b"
									}}
                >
                  <SiLinkedin />
                </a>
              </div>
            </div>

            <div className="individual">
              <div
                className="individual-img"
                style={{
                  backgroundImage: "url(https://avatars.githubusercontent.com/u/29145212?v=4)",
                }}
              ></div>
              <h1 style={{fontSize:"x-large"}}>Vishal Pratap Singh</h1>
              <span>fullstack developer</span>
              <div className="individual-social">
                <a
                  className="individual-social-github"
                  rel="noopener noreferrer"
                  target="_blank"
									href="https://github.com/Vishal19111999"
									style={{
										color: "#a0979b"
									}}
                >
                  <SiGithub />
                </a>
                <a
                  className="individual-social-linkedin"
                  rel="noopener noreferrer"
                  target="_blank"
									href="https://linkedin.com/in/Vishal19111999"
									style={{
										color: "#a0979b"
									}}
                >
                  <SiLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
