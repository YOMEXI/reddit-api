import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Axios from "axios";

import React from "react";
import HomeHeader from "../../../../components/header/homeHeader";

import SideBar from "./../../../../components/cards/sideBar";
import { Row, Col, Container, Image } from "react-bootstrap";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isAuth } from "../../../../components/utils/auth";
import CommentCard from "../../../../components/cards/commentCard";
import CommentForm from "./commentForm";

dayjs.extend(relativeTime);

const PostPage = () => {
  const router = useRouter();

  const { sub, identifier, slug } = router.query;

  const { data: post, error } = useSWR(
    identifier && slug ? `/post/${identifier}/${slug}` : null
  );
  if (error) router.push("/");

  //vote

  const vote = async (value: number) => {
    if (!isAuth()) router.push("/");

    //if vote is the same reset vote
    if (value === post.userVote) {
      value = 0;
    }
    try {
      const { data } = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>

      <HomeHeader />

      {post && (
        <Col>
          <Link href={`/r/${sub}`}>
            <a>
              <Row className="text-center justify-content-center text-light bg-secondary mb-2 p-1">
                <Col className="d-flex ext-center justify-content-center">
                  <Image
                    style={{ width: "70px", height: "70px" }}
                    src={post.sub.imageUrl}
                    roundedCircle
                  />

                  <p className="mt-3">/r/{sub}</p>
                </Col>
              </Row>
            </a>
          </Link>
        </Col>
      )}

      <Row className="bg-light">
        <Container>
          <Row>
            {post && (
              <Col lg={1} md={11} sm={10} xs={10}>
                <Container>
                  {" "}
                  <Row className="mt-3 d-flex ">
                    {post.userVote === 1 ? (
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
                    <Col className=" text-dark ml-1">{post.voteScore}</Col>

                    {post.userVote === -1 ? (
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
                </Container>
              </Col>
            )}

            {post && (
              <>
                <Col
                  lg={6}
                  md={11}
                  sm={12}
                  xs={12}
                  className="p-2 bg-dark text-white"
                >
                  <Container>
                    <Col lg={10} md={11} sm={10} xs={10}>
                      <Row>
                        <Col xs={5} className="mt-1">
                          <Link href={`/r/${post.subName}`}>
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
                                    href={`/r/${post.subName}`}
                                  >
                                    /r/{post.subName}
                                  </a>
                                </Col>
                              </Row>
                            </>
                          </Link>
                        </Col>
                        <Col xs={7} className="mt-1 ">
                          <div>
                            <Link href="">
                              <a className="text-white ml-1">
                                posted by-- {post.username}
                              </a>
                            </Link>
                          </div>
                          <div className="d-none d-lg-block">
                            <Link href={post.url}>
                              <a className="ml-1 text-white">
                                {dayjs(post.createdAt).fromNow()}
                              </a>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={10} md={11} sm={10} xs={10} className="mt-1">
                      <Link href={post.url}>
                        <a
                          className="text-white mx-2 my-1 bg-secondary p-1"
                          style={{ borderRadius: "49px" }}
                        >
                          {post.title}
                        </a>
                      </Link>
                      {post.body && (
                        <p className="mt-2 bg-dark text-white p-2">
                          {post.body}
                        </p>
                      )}
                      <Col className="d-flex ">
                        <Link href={post.url}>
                          <a>
                            <div className="p-2  text-white po">
                              <i className="fas fa-comment mr-1 "></i>
                              <span>{post.commentCount} Comments</span>
                            </div>
                          </a>
                        </Link>

                        <div>
                          <div className="p-2  text-white po">
                            <i className="fas fa-share mr-1"></i>
                            <span>share</span>
                          </div>
                        </div>
                        <div>
                          <div className="p-2  text-white po">
                            <i className="fas fa-bookmark mr-1"></i>
                            <span>bookmarks</span>
                          </div>
                        </div>
                      </Col>
                    </Col>
                  </Container>
                </Col>

                <Col lg={4} className="d-none d-lg-block">
                  <Container>{post && <SideBar sub={post.sub} />}</Container>
                </Col>
              </>
            )}
          </Row>
          {isAuth() ? (
            <Row className=" ">
              <Col>
                <CommentForm name="comment" placeholder="comment" type="text" />
              </Col>
            </Row>
          ) : (
            <Col>Login Or Sign Up to leave a comment</Col>
          )}
          <div className="mt-3">
            <Container>
              <CommentCard
                sub={sub}
                identifier={identifier}
                slug={slug}
                post={post}
              />
            </Container>
          </div>
        </Container>
      </Row>
    </>
  );
};

export default PostPage;
