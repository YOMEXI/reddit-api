import * as Yup from "yup";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Formik, Form } from "formik";
import { GetServerSideProps } from "next";
import Axios from "axios";

import { useRouter } from "next/router";
import FormikControl from "./../../../components/form/formikControl-TextArea";
import HomeHeader from "../../../components/header/homeHeader";

const SubmitPostForm = () => {
  const initialValues = {
    body: "",
    title: "",
  };

  const router = useRouter();
  let sub = router.query.sub;
  //
  const validationSchema = Yup.object({
    body: Yup.string().min(1).required("required"),
    title: Yup.string().min(1).required("required"),
  });

  //
  const onSubmit = async (values, onSubmitProps) => {
    let body = values.body;
    let title = values.title;

    const { data: post } = await Axios.post(`/post/create`, {
      body,
      title,
      sub,
    });

    router.push(`/r/${sub}/${post.identifier}/${post.slug}`);

    onSubmitProps.resetForm();
  };

  return (
    <div className="bg2">
      <HomeHeader />
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
                    placeholder="Title"
                    name="title"
                    as=""
                    col=""
                    row=""
                  />
                  <FormikControl
                    type="text"
                    placeholder="Submit Post"
                    name="body"
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
