import * as Yup from "yup";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

import FormikControl from "../../components/form/formikControl";
import HomeHeader from "../../components/header/homeHeader";
import { login } from "./../../components/redux/authReducer/authActions";
import { successMessage } from "../../components/utils/alerts";
import { Loader } from "../../components/utils/alerts";
import { useEffect } from "react";
import { isAuth } from "../../components/utils/auth";

const Login = () => {
  //router
  const router = useRouter();

  //redux

  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);
  const { loading, error, success, loggedIn } = auth;

  useEffect(() => {
    if (isAuth()) {
      router.push("/");
    }
  }, [router, success, loggedIn]);

  const initialValues = {
    username: "",

    password: "",
  };

  //
  const validationSchema = Yup.object({
    username: Yup.string().min(1).required("required"),

    password: Yup.string().min(7, "At least 7 characters").required("required"),
  });

  //
  const onSubmit = (values, onSubmitProps) => {
    dispatch(login(values));
    onSubmitProps.resetForm();
  };

  return (
    <>
      <Head>
        <title> Login</title>
      </Head>
      <div className="bg2">
        <HomeHeader />
        <div className="my-1">
          {success && successMessage(success)}
          {loading && <Loader />}
        </div>
        <h3 className="d-flex justify-content-center text-white mt-2">Login</h3>
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
                    <Col lg={9} sm={9} xs={10} md={10}>
                      <FormikControl
                        placeholder="Username"
                        type="text"
                        name="username"
                      />
                      <small className="d-flex justify-content-center text-danger">
                        {error && error.username}
                        {error && error.message}
                      </small>

                      <FormikControl
                        placeholder="Password"
                        type="password"
                        name="password"
                      />
                      <small className="d-flex justify-content-center text-danger">
                        {error && error.password}
                      </small>
                    </Col>
                    <Col
                      lg={9}
                      sm={9}
                      xs={10}
                      md={10}
                      className="d-flex justify-content-center align-items-center  mt-4"
                    >
                      <Button
                        variant="light"
                        type="submit"
                        className="bg-dark text-white"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default Login;
