import Head from "next/head";
import { useRouter } from "next/router";
import Axios from "axios";
import Link from "next/link";
import React, { ChangeEvent, useRef } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import useSWR from "swr";
import PostCard from "../../components/cards/postCard";
import SideBar from "../../components/cards/sideBar";
import HomeHeader from "../../components/header/homeHeader";
import { getCookie, isAuth, OwnSub } from "../../components/utils/auth";
import classnames from "classnames";

const Sub = () => {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error, revalidate } = useSWR(
    subName ? `/sub/${subName}` : null
  );
  if (error) router.push("/");
  let POST: any;
  if (!sub) {
    POST = <div>Loading</div>;
  } else if (sub.posts.length === 0) {
    <p className="justify-content-center">No Posts Yet</p>;
  } else {
    POST = sub.posts.map((p: any) => (
      <PostCard key={p.identifier} p={p} revalidate={revalidate} />
    ));
  }

  ///input

  const fileaInputRef = useRef<HTMLInputElement>();

  const openFileInput = (type: string) => {
    if (!OwnSub) return;
    fileaInputRef.current.name = type;
    fileaInputRef.current.click();
  };

  const imgUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.set(`${fileaInputRef.current.name}`, file);
    // formData.append("type", );

    try {
      await Axios.post(`/sub/image/${subName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>{sub?.name}</Head>
      <div className="bg">
        <HomeHeader />

        {isAuth() && (
          <input
            type="file"
            hidden={true}
            ref={fileaInputRef}
            onChange={imgUpload}
          />
        )}

        {!isAuth() && (
          <input
            type="file"
            disabled={true}
            hidden={true}
            ref={fileaInputRef}
            onChange={imgUpload}
          />
        )}

        <Row>
          <Col className="d-flex justify-content-center m-2">
            <div className=" mt-3 mr-3">
              <h2> {sub?.name}</h2>
            </div>
            <div>
              <Image
                onClick={() => openFileInput("image")}
                src={sub?.imgUrl}
                style={{
                  borderRadius: "47px",
                  width: "70px",
                  height: "70px",
                }}
                className={classnames("bg-light", {
                  po: isAuth() && OwnSub(sub, isAuth),
                })}
              />
            </div>
          </Col>
        </Row>
        <Container>
          {isAuth() ? (
            <Col lg={8} className="my-2">
              <Button style={{ width: "100%" }}>
                <Link href={`/r/${subName}/submit`}>
                  <a className="text-white">Create Post</a>
                </Link>
              </Button>
            </Col>
          ) : (
            ""
          )}
          <Row className="bg">
            <Col>{sub && POST}</Col>
            <Col lg={4} className="d-none d-md-block">
              {sub && <SideBar sub={sub} />}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Sub;
