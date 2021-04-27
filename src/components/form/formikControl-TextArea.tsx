import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormControl } from "react-bootstrap";
import TextError from "./TextError";

import React from "react";

interface InputProps {
  placeholder: string;
  name: string;
  type: string;
  col: string;
  row: string;
  as: string;
}

const formikControlTextArea: React.FC<InputProps> = ({
  placeholder,
  name,
  type,
  col,
  row,
  as,
}) => {
  return (
    <div>
      <Row className="d-flex">
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
            as={as}
            cols={col}
            rows={row}
          />

          <ErrorMessage name={name} className="error" component={TextError} />
        </Col>
      </Row>
    </div>
  );
};

export default formikControlTextArea;
