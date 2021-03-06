import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Button, Label, UncontrolledAlert } from "reactstrap";
import isEmpty from "lodash/isEmpty";
import { FormWrapper } from "../../styles";

import { registerUser } from "../../redux/actions/authActions";

const Register = ({ registerUser, errors, history, isAdmin, redirectPath }) => {
  // handle submit
  const onSubmit = (values) => {
    console.log("**** values from the form ***", values);

    registerUser(values, history, redirectPath);
  };

  // use Yup to define a validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("* Required!"),
    lastName: Yup.string().required("* Required!"),
    email: Yup.string()
      .required("* Required!")
      .email("* Invalid email address!"),
    dateOfBirth: Yup.date().required("* Required"),
  });

  // initial values for the form
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date(),
    isAdmin: isAdmin,
  };

  const handleRedirectToLogin = (e) => {
    history.push({
      pathname: "/login",
    });
  };
  return (
    <FormWrapper className="container">
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
          {/* firstName */}
          <Label className="text-black" for="firstName">
            First Name
          </Label>
          <Field
            className="mb-2 form-control form-text"
            type="text"
            name="firstName"
            id="firstName"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            style={{ color: "red" }}
          />
          {/* lastName */}
          <Label className="text-black" for="lastName">
            Last Name
          </Label>
          <Field
            className="mb-2 form-control form-text"
            type="text"
            name="lastName"
            id="lastName"
          />
          <ErrorMessage
            name="lastName"
            component="div"
            style={{ color: "red" }}
          />
          {/* email */}
          <Label className="text-black" for="email">
            Email
          </Label>
          <Field
            className="mb-2 form-control form-text"
            type="email"
            name="email"
            id="email"
          />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />
          {/* DOB */}
          <Label className="text-black" for="dateOfBirth">
            Date of birth
          </Label>
          <Field
            className="mb-2 form-control form-text"
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
          />
          <ErrorMessage
            name="dateOfBirth"
            component="div"
            style={{ color: "red" }}
          />
          {/* submit btn */}
          <Button className="mt-3" type="submit" color="primary">
            Register
          </Button>
          <small>
            Already have an account?{" "}
            <Button color="link" onClick={handleRedirectToLogin}>
              Login
            </Button>
          </small>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps, { registerUser })(Register));
