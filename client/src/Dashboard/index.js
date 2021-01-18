import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

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

const Dashboard = ({ auth }) => {
  const [state, setState] = useState({
    userTasks: [],
    managedUsers: [],
  });

  const { userTasks, managedUsers } = state;
  return (
    <div className="container mt-5">
      <ContentWrapper>
        <div>
          <Img src="https://picsum.photos/id/1/200/300" />
          <div className="text-lg text-capitalize font-weight-bold mt-2 ml-3">{`${auth.user.firstName} ${auth.user.lastName}`}</div>
        </div>
        <div className="d-flex flex-column">
          <div className="text-lg font-weight-bold">Tasks</div>
          {userTasks.length ? (
            <div> your tasks</div>
          ) : (
            <div>you haven't been assigned any tasks yet</div>
          )}
          {auth.user.isAdmin && (
            <Button className="mt-3" color="primary">
              Create A Task
            </Button>
          )}
        </div>
        {auth.user.isAdmin && (
          <div className="d-flex flex-column">
            <div className="text-lg font-weight-bold">Users</div>
            {managedUsers.length ? (
              <div>you have users</div>
            ) : (
              <div className="text-md">
                You aren't managing any users, create some? <br />
                <Button className="mt-3" color="primary">
                  Create Users
                </Button>
              </div>
            )}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
