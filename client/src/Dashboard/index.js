import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import Task from "./components/Task";
import Login from "../Auth/Login";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 5rem;
  }
`;

const Img = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;

const Dashboard = ({ auth, history }) => {
  const [state, setState] = useState({
    userTasks: [],
    managedUsers: [],
    showLogin: false,
  });

  const { userTasks, managedUsers, showLogin } = state;

  const handleCreateTaskClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/task",
    });
  };

  const handleCreateUserClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/createUser",
    });
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setState((state) => ({
        ...state,
        showLogin: true,
      }));
    }
    console.log("++++++++++++++++++", auth.user);
  }, [auth]);

  useEffect(() => {
    const fetchAllTasks = () => {
      axios
        .get("http://localhost:5000/api/task/tasks/all", {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        })
        .then((tasks) => {
          console.log("***** all tasks *******", tasks.data);
          setState((state) => ({
            ...state,
            userTasks: tasks.data,
          }));
        })
        .catch((err) =>
          console.log("****** err when fetching users ****", err)
        );
    };

    fetchAllTasks();
  }, []);

  return (
    <div
      className="container mt-5"
      style={{ display: "flex", justifyContent: "center", width: "80vw" }}
    >
      {showLogin ? (
        <Redirect to="/login" />
      ) : (
        <ContentWrapper>
          <div>
            <Img src="https://picsum.photos/id/1/200/300" />
            <div className="text-lg text-capitalize font-weight-bold mt-2 ml-3">{`${auth.user.firstName} ${auth.user.lastName}`}</div>
            <p className="text-md">{auth.user.email}</p>
          </div>
          <div className="d-flex flex-column">
            <div className="text-lg font-weight-bold">Tasks</div>
            {auth.user.isAdmin && (
              <Button
                className="mt-3"
                color="primary"
                onClick={handleCreateTaskClick}
              >
                Create A Task
              </Button>
            )}
            {userTasks.length ? (
              <div>
                {userTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div>you haven't been assigned any tasks yet</div>
            )}
          </div>
          {auth.user.isAdmin && (
            <div className="d-flex flex-column">
              <div className="text-lg font-weight-bold">Users</div>
              {managedUsers.length ? (
                <div>you have users</div>
              ) : (
                <div className="text-md">
                  Create users <br />
                  <Button
                    className="mt-3"
                    color="primary"
                    onClick={handleCreateUserClick}
                  >
                    Create Users
                  </Button>
                </div>
              )}
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(Dashboard));
