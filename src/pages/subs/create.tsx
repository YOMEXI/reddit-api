import * as Yup from "yup";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Formik, Form } from "formik";
import { GetServerSideProps } from "next";
import {
  Loader,
  successMessage,
  errorMessage,
} from "../../components/utils/alerts";
import Axios from "axios";

import { useRouter } from "next/router";
import FormikControl from "./../../components/form/formikControl-TextArea";
import HomeHeader from "../../components/header/homeHeader";
import { useState } from "react";

const SubmitPostForm = () => {
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const initialValues = {
    name: "",
    title: "",
    description: "",
  };

  const router = useRouter();

  //
  const validationSchema = Yup.object({
    name: Yup.string().min(1).required("required"),

    title: Yup.string().min(1).required("required"),
    description: Yup.string().min(1).required("required"),
  });

  //
  const onSubmit = async (values, onSubmitProps) => {
    const { title, name, description } = values;
    setloading(true);
    try {
      const { data: sub } = await Axios.post(`/sub/creates`, {
        title,
        name,
        description,
      });
      setloading(false);
      setsuccess(sub.message);
      router.push("/");
    } catch (error) {
      console.log();
      setloading(false);
      seterror(
        error.response.data.name
          ? error.response.data.name
          : error.response.data
      );
    }

    onSubmitProps.resetForm();
  };

  return (
    <div className="bg2">
      <HomeHeader />
      {success && successMessage(success)}

      {loading && <Loader />}

      {error && errorMessage(error)}

      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Row className="d-flex justify-content-center">
                  <Col lg={11} sm={9} xs={10} md={10}>
                    <FormikControl
                      type="text"
                      placeholder="Name"
                      name="name"
                      as=""
                      col=""
                      row=""
                    />
                    <FormikControl
                      type="text"
                      placeholder="Title"
                      name="title"
                      as=""
                      col=""
                      row=""
                    />
                    <FormikControl
                      type=""
                      placeholder="Description"
                      name="description"
                      as="textarea"
                      col="5"
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
      </Container>
    </div>
  );
};

export default SubmitPostForm;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // ...
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Bad Auth");
    await Axios.get(`/auth/me`, { headers: { cookie } });

    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        statusCode: 307,
      },
    };
  }
};
