import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Label } from "reactstrap";

import { registerUser } from "../../redux/actions/authActions";

const Register = ({ registerUser, errors }) => {
  // handle submit
  const onSubmit = (values) => {
    console.log("**** values from the form ***", values);

    registerUser(values);
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
    isAdmin: true,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="container mt-5 d-flex flex-column">
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
        <ErrorMessage name="firstName" component="div" />
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
        <ErrorMessage name="lastName" component="div" />
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
        <ErrorMessage name="email" component="div" />
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
        <ErrorMessage name="dateOfBirth" component="div" />
        {/* submit btn */}
        <Button className="mt-3" type="submit" color="primary">
          Register
        </Button>
      </Form>
    </Formik>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
