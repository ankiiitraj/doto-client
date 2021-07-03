import React from 'react';
import {Link} from 'react-router-dom'

import "./lists.css"

const Lists = ({which, updateWhich}) => {
  return(
    <>
      <div>
        <Link to='/' className="lists-link">
          <div onClick={() => {
            updateWhich("done")
            console.log(which)
          }}
          className="lists-card">
            <div className="lists-header">
              DSA problems list
            </div>
          </div>
        </Link>
        <Link to='/' className="lists-link">
          <div onClick={() => {
            updateWhich("doneCP")
          }}
          className="lists-card">
            <div className="lists-header">
              CP Expert problems list
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Lists;