import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import data from "../../data/problems.json";
import topics from "../../data/topics.json";
import axios from 'axios';
import "./list.css";

const List = (props) => {
  const {updateCounter} = props;
  const [done, update] = useState(props.done || []);
  const [loading, updateLoading] = useState(Array(data.length).fill(0));
  const [locked, updateLock] = useState(1);
  useEffect(()=>{
    if(props.done.length > 0){
      updateLock(0);
    }
    update([...props.done]);
  }, [props.done])

  const updateDone = (id, checked) => {
    updateLoading(loading.map((elem, idx) => {
      return idx === id ? 1 : elem
    }));
    updateLock(1);
    axios.put('/api/done', {'id': id, 'ty': (checked ? 'add' : 'del')}, {
      headers: {
        'authorization': `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        if(checked && done.indexOf(id) === -1){
          updateCounter(done.length +1);
          update([...done, id]);
        }
        else if(!checked && done.indexOf(id) !== -1){
          updateCounter(done.length -1);
          done.splice(done.indexOf(id), 1);
          update([...done]);
        }
        updateLoading(loading.map((elem, idx) => {
          return idx === id ? 0 : elem
        }));
        updateLock(0);
        NotificationManager.success('Status has been updated 🎉', 'Update');
      })
      .catch(err => {
        updateLoading(loading.map((elem, idx) => {
          return idx === id ? 0 : elem
        }));
        updateLock(0);
        NotificationManager.warning('something wrong happened! try again later 😵', 2000);
      })
  }
  return (
    <div className="list">
      {topics.map((elem, idx) => {
        return (
          <div className="topic" key={`${idx}`}>
            <h1 className="">{elem}</h1>
            <table className="table-items">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, id) => {
                  return (
                    el.topic === elem && (
                      <tr key={`${id}`}>
                        <td>{id}</td>
                        <td>
                          <a rel='noopener noreferrer' target="_blank" href={el.link}>
                            {el.name}
                          </a>
                        </td>
                        <td style={{display: 'flex'}}>
                          <input disabled={locked} checked={done.indexOf(id) === -1 ? false : true} onChange={(e)=>{updateDone(id, e.target.checked)}} type="checkbox" id={`switch${id}`} />
                          <label style={{background: (locked?'#b5b0b0':'')}} htmlFor={`switch${id}`}>Toggle</label>
                          <div className="spinner" style={{ marginLeft: '3px', display: (loading[id]===0?'none':'initial')}}>
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                          </div>
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
      <NotificationContainer />
    </div>
  );
};

export default List;
