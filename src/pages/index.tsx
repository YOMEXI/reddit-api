import Head from "next/head";
import { useState, useEffect } from "react";

import useSWR, { useSWRInfinite } from "swr";
import { Col, Row, Container, Image } from "react-bootstrap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import HomeHeader from "../components/header/homeHeader";
import PostCard from "../components/cards/postCard";
import { Loader } from "../components/utils/alerts";
dayjs.extend(relativeTime);

const Home = () => {
  const {
    data,
    error,

    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite((index) => `/post?page=${index}`);

  const AllPost = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;

  // const { data: AllPost } = useSWR("/post/");

  const { data: popularSub } = useSWR("/sub/popular");

  const [observedPost, setobservedPost] = useState("");

  useEffect(() => {
    if (!AllPost || AllPost.length === 0) return;

    const id = AllPost[AllPost.length - 1].identifier;

    if (id !== observedPost) {
      setobservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [AllPost]);

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Reached Bottom of post");
          setPage(page + 1);
          observer.observe(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  console.log(process.env.NEXT_PUBLIC_PUBLIC_URL);
  return (
    <>
      <Head>
        <title>penddit home</title>
      </Head>
      <div className="bg">
        <HomeHeader />

        <Container>
          <Row className="mt-3">
            <Col lg={8} md={8} sm={11} xs={11}>
              {" "}
              {AllPost
                ? AllPost.map((p, i) => (
                    <Col key={p.identifier}>
                      <PostCard p={p} revalidate={revalidate} />
                    </Col>
                  ))
                : ""}
            </Col>

            <Col className="d-none d-md-block text-center bg-light">
              <Container>
                <Row className="text-center justify-content-center">
                  <Col lg={9} md={9}>
                    <h3>Top Subs</h3>
                  </Col>
                  <Col className="mt-2 bg-dark text-white po" lg={12} md={12}>
                    <h4>
                      {popularSub &&
                        popularSub.map((p, i) => (
                          <Row key={i} className="mt-2">
                            <Col lg={1} md={1}>
                              <Image
                                style={{
                                  borderRadius: "47px",
                                  width: "30px",
                                  height: "30px",
                                }}
                                src={p?.imageUrl}
                              />
                            </Col>
                            <Col>
                              <a
                                href={`/r/${p.name}`}
                                className="mt-2 text-white"
                              >
                                <u>/r/{p.name}</u>
                              </a>
                            </Col>
                            <Col lg={1} md={1}>
                              {p.postCount}
                            </Col>
                          </Row>
                        ))}
                    </h4>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
