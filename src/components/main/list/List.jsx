import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import data from "../../data/problems.json";
import topics from "../../data/topics.json";
import axios from 'axios';
import "./list.css";

const List = (props) => {
  const {updateCounter} = props;
  const [done, update] = useState(props.done || []);
  useEffect(()=>{
    update([...props.done]);
  }, [props.done])
  const updateDone = (id, checked) => {
    axios.put('/api/done', {'id': id, 'ty': (checked ? 'add' : 'del')}, {
      headers: {
        'authorization': `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        if(checked && done.indexOf(id) === -1){
          props.updateCounter(done.length +1);
          update([...done, id])
        }
        else if(!checked && done.indexOf(id) !== -1){
          props.updateCounter(done.length -1);
          done.splice(done.indexOf(id), 1);
          update([...done]);
        }
        NotificationManager.success('Status has been updated 🎉', 'Update');
      })
      .catch(err => {
        NotificationManager.warning('something wrong happened! try again later 😵', 'Close after 2000ms', 2000);
      })
  }
  updateCounter(props.done.length);
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
                        <td>
                          <input checked={done.indexOf(id) === -1 ? false : true} onChange={(e)=>{updateDone(id, e.target.checked)}} type="checkbox" id={`switch${id}`} />
                          <label htmlFor={`switch${id}`}>Toggle</label>
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
