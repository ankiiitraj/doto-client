import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// import { ReactComponent as Arrow } from "../../data/arrow.svg";
import axios from "axios";
import getTopicWiseCount from "../../util/topicFrequency";
import "./list.css";

const List = (props) => {
  const { updateCounter, data, topics, which } = props;
  const [done, update] = useState(props.done || []);
  const [loading, updateLoading] = useState(Array(data.length).fill(0));
  const [locked, updateLock] = useState(1);
  const [collapsed, updateCollapsed] = useState(Array(topics.length).fill(1));
  const [topicWiseCount, updateTopicWiseCount] = useState(
    Array(topics.length).fill(0)
  );

  useEffect(() => {
    if (props.dataArrived === true) {
      updateLock(0);
      getTopicWiseCount(props.done, data, topics).then((result) => {
        updateTopicWiseCount([...result]);
      });
    }
    update([...props.done]);
  }, [props.done, props.dataArrived, data, topics]);

  const updateDone = (id, checked) => {
    updateLoading(
      loading.map((elem, idx) => {
        return idx === id ? 1 : elem;
      })
    );
    updateLock(1);
    axios
      .put(
        `${process.env.REACT_APP_BASE_ENDPOINT || ""}/${which}`,
        { id: id, ty: checked ? "add" : "del" },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (checked && done.indexOf(id) === -1) {
          updateCounter(done.length + 1);
          getTopicWiseCount([...done, id], data, topics).then((result) => {
            updateTopicWiseCount([...result]);
          });
          update([...done, id]);
        } else if (!checked && done.indexOf(id) !== -1) {
          updateCounter(done.length - 1);
          done.splice(done.indexOf(id), 1);
          update([...done]);
          getTopicWiseCount([...done], data, topics).then((result) => {
            updateTopicWiseCount([...result]);
          });
        }
        updateLoading(
          loading.map((elem, idx) => {
            return idx === id ? 0 : elem;
          })
        );
        updateLock(0);
        NotificationManager.success("Updated 🎉");
      })
      .catch((err) => {
        updateLoading(
          loading.map((elem, idx) => {
            return idx === id ? 0 : elem;
          })
        );
        updateLock(0);
        NotificationManager.warning("Error 😵");
      });
  };

  const handleCollapse = (idx) => {
    const temp = collapsed;
    temp[idx] = !temp[idx];
    updateCollapsed([...temp]);
  };

  return (
    <div className="list">
      {topics.map((elem, idx) => {
        return (
          <div className="topic" key={`${idx}`}>
            <div
              className="heading"
              onClick={() => {
                handleCollapse(idx);
              }}
            >
              <div>
                <h1 className="heading-h1">{elem}</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#B2B2B2",
                    fontSize: "x-large",
                    marginRight: "10px",
                    fontWeight: 600
                  }}
                >
                  <span style={{ color: "#FF00B888" }}>
                    {topicWiseCount[idx].done || 0}
                  </span>{" "}
                  / {topicWiseCount[idx].total || 0}
                </span>
                {/* <Arrow
                  style={{
                    transition: "visibility 1s",
                    transform: collapsed[idx] ? "scaleY(-1)" : "",
                  }}
                  height={30}
                  width={30}
                /> */}
              </div>
            </div>
            <div
              className="table-wrapper"
              style={{
                transition: "height 1s",
                height: collapsed[idx] ? "0px" : "initial",
                overflow: collapsed[idx] ? "hidden" : "initial",
              }}
            >
              <table className="table-items">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    {data[0]?.rated && <th>Rating</th>}
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
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={el.link}
                              style={{textDecoration:"none"}}
                            >
                              <b>
                              {el.name}
                              </b>
                            </a>
                          </td>
                          {el?.rated && <td>{el.rated}</td>}
                          <td style={{ display: "flex" }}>
                            <input
                              disabled={locked}
                              checked={done.indexOf(id) === -1 ? false : true}
                              onChange={(e) => {
                                updateDone(id, e.target.checked);
                              }}
                              type="checkbox"
                              id={`switch${id}`}
                            />
                            <label
                              style={{ background: locked ? "#b5b0b0" : "" }}
                              htmlFor={`switch${id}`}
                            >
                              Toggle
                            </label>
                            <div
                              className="spinner"
                              style={{
                                marginLeft: "3px",
                                WebkitMarginStart: "-15px",
                                display: loading[id] === 0 ? "none" : "initial",
                              }}
                            >
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
          </div>
        );
      })}
      <NotificationContainer />
    </div>
  );
};

export default List;
