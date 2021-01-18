import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Label, UncontrolledAlert } from "reactstrap";
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import emailjs from "emailjs-com";
import { withRouter } from "react-router-dom";

// initialize emialjs
emailjs.init("user_TcSW9Ucj4DT9jNZ8bGu7R");

const Task = ({ auth, history }) => {
  const [state, setState] = useState({
    users: [],
    errors: {},
  });

  const { users, errors } = state;

  // handle submit
  const onSubmit = (values) => {
    console.log("**** values from the form ***", values);
    const { name, description, dateAssigned, dueDate, userId } = values;

    const newTask = {
      name,
      description,
      dateAssigned,
      dueDate,
      userId: parseInt(userId),
    };

    axios
      .post("http://localhost:5000/api/task/add", newTask, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((createdTask) => {
        console.log("****** created task ******", createdTask);
        const createdTaskData = createdTask.data;
        const {
          name,
          description,
          dateAssigned,
          dueDate,
          userId,
        } = createdTaskData;

        // get the assigned user
        if (users.length) {
          const recipient = users.filter((user) => user.id === userId);
          console.log("%%%%%%%%%%%%%%%%%%", recipient[0]);
          const emailJsTemplateParams = {
            receipient_name: `${recipient[0].firstName} ${recipient[0].lastName}`,
            admin_name: `${auth.user.firstName} ${auth.user.lastName}`,
            task_name: name,
            task_description: description,
            date_assigned: dateAssigned,
            due_date: dueDate,
            receipient_email: recipient[0].email,
            admin_email: auth.user.email,
          };

          console.log(
            "::::::::: emailJsTemplateParams :::::::::",
            emailJsTemplateParams
          );
          emailjs
            .send("service_2zu5x4g", "template_l82v0rl", emailJsTemplateParams)
            .then((res) => {
              const { status } = res;
              console.log(`##### success?: ${status} #####`);
              // redirect to home
              history.push({
                pathname: "/",
              });
            })
            .catch((err) => {
              console.error(
                "***** error sending form details via emailjs *****",
                err
              );
            });
        }

        // redirect home
        history.push({
          pathname: "/",
        });
      })
      .catch((err) =>
        setState((state) => ({
          ...state,
          errors: err,
        }))
      );
  };

  // use Yup to define a validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("* Required!"),
    description: Yup.string().required("* Required!"),
    dateAssigned: Yup.date().required("* Required"),
    dueDate: Yup.date().required("* Required"),
  });

  // initial values for the form
  const initialValues = {
    name: "",
    description: "",
    userId: 0,
    dateAssigned: new Date(),
    dueDate: new Date(),
  };

  useEffect(() => {
    const fetchAllUsers = () => {
      axios
        .get("http://localhost:5000/api/auth/user/all", {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        })
        .then((fetchedUsers) => {
          console.log("********* fetched users ******", fetchedUsers);
          setState((state) => ({
            ...state,
            users: fetchedUsers.data,
          }));
        })
        .catch((err) => console.error(">>>>>>>>>>>>", err));
    };

    fetchAllUsers();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="container mt-5 d-flex flex-column">
        {!isEmpty(errors) && (
          <UncontrolledAlert color="danger">
            {JSON.stringify(errors.email)}
          </UncontrolledAlert>
        )}
        {/* name */}
        <Label className="text-black" for="name">
          Name
        </Label>
        <Field
          className="mb-2 form-control form-text"
          type="text"
          name="name"
          id="name"
        />
        <ErrorMessage name="name" component="div" />
        {/* description */}
        <Label className="text-black" for="description">
          Description
        </Label>
        <Field
          className="mb-2 form-control form-text"
          type="text"
          name="description"
          id="description"
          as="textarea"
        />
        <ErrorMessage name="description" component="div" />
        {/* assignee */}
        <Label className="text-black" for="userId">
          Assignee
        </Label>
        <Field
          className="mb-2 form-control form-select"
          aria-label="select a user"
          name="userId"
          id="userId"
          component="select"
        >
          <option defaultValue>Assign task to a user</option>
          {users.length &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
        </Field>
        <ErrorMessage name="description" component="div" />
        {/* dateAssigned */}
        <Label className="text-black" for="dateAssigned">
          Date Assigned
        </Label>
        <Field
          className="mb-2 form-control form-text"
          type="date"
          name="dateAssigned"
          id="dateAssigned"
        />
        <ErrorMessage name="dateAssigned" component="div" />
        {/* dueDate */}
        <Label className="text-black" for="dueDate">
          Due Date
        </Label>
        <Field
          className="mb-2 form-control form-text"
          type="date"
          name="dueDate"
          id="dueDate"
        />
        <ErrorMessage name="dueDate" component="div" />
        {/* submit btn */}
        <Button className="mt-3" type="submit" color="primary">
          Create Task
        </Button>
      </Form>
    </Formik>
  );
};

Task.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(Task));
