import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { isAuth } from "../utils/auth";

const sideBar = ({ sub }) => {
  return (
    <>
      <Row className="justify-content-center text-center bg-secondary text-white">
        <Col lg={12} className="bg-dark mb-3 text-white">
          <h3>All About {sub.name}</h3>
        </Col>
        <Col lg={11}>
          <h3>{sub.description}</h3>
        </Col>
        <Col lg={11}>
          <h4>{sub.description}</h4>
        </Col>
        <Col lg={11}>
          Created <h5>{dayjs(sub.createdAt).format(" D MMM YYYY")}</h5>
        </Col>
      </Row>
    </>
  );
};

export default sideBar;
