import React, { useEffect, useState } from "react";
import axios from "axios";

const Task = ({ task, userId }) => {
  const [state, setState] = useState({
    assigneeName: "",
  });

  const { assigneeName } = state;

  useEffect(() => {
    const getUserById = () => {
      axios
        .get(`http://localhost:5000/api/auth/user/${task.userId}`, {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        })
        .then((user) => {
          setState((state) => ({
            ...state,
            assigneeName: `${user.data.firstName} ${user.data.lastName}`,
          }));
        })
        .catch((err) =>
          console.error("**** err when fetching user by id ****", err)
        );
    };

    getUserById();
  }, []);

  return (
    <>
      {userId === task.userId && (
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{task.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{assigneeName}</h6>
            <p className="card-text">{task.description}</p>
            <p className="card-subtitle mb-2">
              Due on: <span className="text-muted">{task.dueDate}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
