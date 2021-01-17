import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button, Label } from "reactstrap";

const Login = () => {
  // handle submit
  const onSubmit = (values) =>
    console.log("**** values from the form ***", values);

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
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="container mt-5 d-flex flex-column">
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
        {/* submit btn */}
        <Button className="mt-3" type="submit" color="primary">
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default Login;
