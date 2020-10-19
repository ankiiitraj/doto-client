import React, { useState, useEffect } from "react";
import List from "./list/List";

const Main = (props) => {
  const [counter, updateCounter] = useState(0);
  
  useEffect(()=>{
    updateCounter(props.done.length);
  }, [props.done]);

  return (
    <>
      <center>
        <div style={{fontSize: 'xx-large'}}>DSA problems</div>
        <div style={{fontSize: 'x-large'}}>
          Progress: <span style={{color: '#009879'}}>{counter}</span> completed out of 448 problems!
        </div>
        <List done={props.done} updateCounter={updateCounter}/>
      </center>
    </>
  );
};

export default Main;