import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormControl } from "react-bootstrap";
import TextError from "./TextError";

import React from "react";

interface InputProps {
  placeholder: string;
  name: string;
  type: string;
}

const formikControl: React.FC<InputProps> = ({ placeholder, name, type }) => {
  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col
          className="my-2 font-medium text-black"
          lg={5}
          sm={10}
          md={9}
          xs={10}
        >
          <Field
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="form-control"
          />

          <ErrorMessage name={name} className="error" component={TextError} />
        </Col>
      </Row>
    </div>
  );
};

export default formikControl;
