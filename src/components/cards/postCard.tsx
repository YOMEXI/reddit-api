import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import React from "react";
import { isAuth } from "../utils/auth";
import { useRouter } from "next/router";

const postCard = ({
  p: {
    identifier,
    voteScore,
    subName,

    body,
    createdAt,
    url,
    username,
    commentCount,
    title,
    slug,
    userVote,
  },
  revalidate,
}) => {
  const router = useRouter();
  const vote = async (value) => {
    if (!isAuth()) router.push("/");
    if (vote === userVote) value == 0;
    try {
      const { data } = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });
      revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="bg-light my-3 mx-1  " key={identifier} id={identifier}>
      <Col lg={1} className="bg-secondary text-white vt-pg bg3">
        <Row className="mt-3 d-flex ">
          {userVote === 1 ? (
            <Col
              className={`icon-arrow-up2  po  `}
              style={{ color: "blue" }}
              onClick={() => vote(1)}
            ></Col>
          ) : (
            <Col
              className={`icon-arrow-up2  po vt-color1 `}
              onClick={() => vote(1)}
            ></Col>
          )}
          <Col className=" ml-1">{voteScore}</Col>

          {userVote === -1 ? (
            <Col
              className={`icon-arrow-down2  po  `}
              style={{ color: "red" }}
              onClick={() => vote(-1)}
            ></Col>
          ) : (
            <Col
              className={`icon-arrow-down2  po vt-color1 `}
              onClick={() => vote(-1)}
            ></Col>
          )}
        </Row>
      </Col>
      <Col lg={10} md={11} sm={12} xs={12} className="p-2">
        <Row key={identifier}>
          <>
            <Col lg={10} md={11} sm={12} xs={12}>
              <Row>
                <Col xs={5} className="mt-1">
                  <Link href={`/r/${subName}`}>
                    <>
                      <Row>
                        <Col sm={3} xs={3}>
                          <Image
                            style={{
                              borderRadius: "50px",
                              width: "34px",
                              height: "34px",
                            }}
                            src="/img/imgplaceholder.jpg"
                          />
                        </Col>
                        <Col sm={8} xs={8}>
                          <a
                            className="text-white mx-2 bg-secondary p-1 po"
                            style={{
                              borderRadius: "39px",
                            }}
                            href={`/r/${subName}`}
                          >
                            /r/{subName}
                          </a>
                        </Col>
                      </Row>
                    </>
                  </Link>
                </Col>
                <Col xs={7} className="mt-1">
                  <div>
                    <Link href="">
                      <a className="text-dark ml-1">posted by-- {username}</a>
                    </Link>
                  </div>
                  <div className="d-none d-lg-block">
                    <Link href={url}>
                      <a className="ml-1 text-dark">
                        {dayjs(createdAt).fromNow()}
                      </a>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={10} md={11} sm={11} xs={11} className="mt-1">
              <Link href={url}>
                <a
                  className="text-white mx-2 my-1 bg-secondary p-1"
                  style={{ borderRadius: "49px" }}
                >
                  {title}
                </a>
              </Link>
              {body && <p className="mt-2 bg-dark text-white p-2">{body}</p>}
            </Col>
            <Col className="d-flex ">
              <Link href={url}>
                <a>
                  <div className="p-2  text-dark po">
                    <i className="fas fa-comment mr-1"></i>
                    <span>{commentCount} Comments</span>
                  </div>
                </a>
              </Link>

              <div>
                <div className="p-2  text-dark po">
                  <i className="fas fa-share mr-1"></i>
                  <span>share</span>
                </div>
              </div>
              <div>
                <div className="p-2  text-dark po">
                  <i className="fas fa-bookmark mr-1"></i>
                  <span>bookmarks</span>
                </div>
              </div>
            </Col>
          </>
        </Row>
      </Col>
    </Row>
  );
};

export default postCard;
