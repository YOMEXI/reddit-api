import FormikControl from "./../../../../components/form/formikControl-TextArea";
import * as Yup from "yup";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Formik, Form } from "formik";
import Axios from "axios";

const commentForm = ({ type, placeholder, name }) => {
  const initialValues = {
    body: "",
  };

  //
  const validationSchema = Yup.object({
    body: Yup.string().min(1).required("required"),
  });

  //
  const onSubmit = async (values, onSubmitProps) => {
    console.log(values);

    onSubmitProps.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Row className="d-flex justify-content-center">
                <Col lg={9} sm={9} xs={10} md={10}>
                  <FormikControl
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    as="textarea"
                    col="10"
                    row="4"
                  />
                </Col>
                <Col lg={9} sm={9} xs={10} md={10} className="d-flex   ">
                  <Button
                    variant="light"
                    type="submit"
                    className="bg-dark text-white"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default commentForm;
