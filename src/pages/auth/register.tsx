import * as Yup from "yup";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import FormikControl from "../../components/form/formikControl";
// import HomeHeader from "../../components/header/homeHeader";
import { register } from "./../../components/redux/authReducer/authActions";
import { successMessage } from "../../components/utils/alerts";
import { Loader } from "../../components/utils/alerts";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { isAuth } from "../../components/utils/auth";

const HomeHeader = dynamic(() => import("../../components/header/homeHeader"), {
  ssr: false,
});

const Register = () => {
  //router
  const router = useRouter();

  //redux

  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);
  const { loading, error, success, registered } = auth;

  useEffect(() => {
    if (isAuth()) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (success || registered) {
      router.push("/auth/login");
    }
  }, [router, success, registered]);

  const initialValues = {
    username: "",
    age: "",
    password: "",
    email: "",
  };

  //
  const validationSchema = Yup.object({
    username: Yup.string().min(1).required("required"),
    age: Yup.number().min(1).required("required"),
    email: Yup.string().email("invalid email format").required("required"),
    password: Yup.string().min(7, "At least 7 characters").required("required"),
  });

  //
  const onSubmit = (values, onSubmitProps) => {
    dispatch(register(values));
    onSubmitProps.resetForm();
  };

  return (
    <>
      <Head>
        <title> Register</title>
      </Head>
      <div className="bg2" suppressHydrationWarning={true}>
        <HomeHeader />
        <div className="my-1">
          {success && successMessage(success)}
          {loading && <Loader />}
        </div>
        <h3 className="d-flex justify-content-center text-white mt-2">
          Register
        </h3>
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
                      </small>
                      <FormikControl
                        placeholder="Email"
                        type="text"
                        name="email"
                      />
                      <small className="d-flex justify-content-center text-danger">
                        {error && error.email}
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
                      <FormikControl
                        placeholder="Age"
                        type="number"
                        name="age"
                      />
                      <small className="d-flex justify-content-center text-danger">
                        {error && error.age}
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
                        Register
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

export default Register;
