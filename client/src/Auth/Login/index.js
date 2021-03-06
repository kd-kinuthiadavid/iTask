import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Label, UncontrolledAlert } from "reactstrap";
import isEmpty from "lodash/isEmpty";
import { FormWrapper } from "../../styles";

import { loginUser } from "../../redux/actions/authActions";

const Login = ({ history, auth, errors, loginUser }) => {
  // handle submit
  const onSubmit = (values) => {
    console.log("**** values from the form ***", values);

    loginUser(values, history);
  };

  // use Yup to define a validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("* Required!")
      .email("* Invalid email address!"),
  });

  // initial values for the form
  const initialValues = {
    email: "",
  };

  const handleRedirectToRegister = (e) => {
    history.push({
      pathname: "/register",
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
              {JSON.stringify(errors.err)}
            </UncontrolledAlert>
          )}
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
          {/* submit btn */}
          <Button className="mt-3" type="submit" color="primary">
            Login
          </Button>
          <small>
            Don't have an account?{" "}
            <Button color="link" onClick={handleRedirectToRegister}>
              Register
            </Button>
          </small>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
