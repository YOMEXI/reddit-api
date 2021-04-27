import { Row, Col, Container } from "react-bootstrap";
import useSWR from "swr";
import { useRouter } from "next/router";
import Axios from "axios";
import { isAuth } from "../utils/auth";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const CommentCard = ({ sub, identifier, slug, post }) => {
  const { data: comment } = useSWR(
    identifier && slug ? `/comment/${identifier}/${slug}/comment` : null
  );
  console.log(comment);

  const router = useRouter();

  const vote = async (value: number, comment?) => {
    if (!isAuth()) router.push("/");

    //if vote is the same reset vote
    if (
      (!comment && value === post.userVote) ||
      (comment && comment.userVote)
    ) {
      value = 0;
    }
    try {
      const { data } = await Axios.post("/misc/vote", {
        identifier,
        slug,
        commentIdentifier: comment?.identifier,
        value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {comment?.map((comment) => (
        <Row key={comment.identifier}>
          {post && (
            <Col key={comment.identifier} lg={1} md={11} sm={10} xs={10}>
              <Container>
                {" "}
                <Row className="mt-3 d-flex ">
                  {comment.userVote === 1 ? (
                    <Col
                      className={`icon-arrow-up2  po  `}
                      style={{ color: "blue" }}
                      onClick={() => vote(1, comment)}
                    ></Col>
                  ) : (
                    <Col
                      className={`icon-arrow-up2  po vt-color1 `}
                      onClick={() => vote(1, comment)}
                    ></Col>
                  )}
                  <Col className=" text-dark ml-1">{comment.voteScore}</Col>

                  {comment.userVote === -1 ? (
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

          <Col
            lg={5}
            md={11}
            sm={10}
            xs={10}
            className="p-2 m-1 bg-dark text-white"
          >
            <Row>
              <Col lg={2} md={2}>
                {comment.username}
              </Col>

              <Col lg={3} md={3}>
                <p>{dayjs(comment.createdAt).fromNow()}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="p-2 flex-wrap">{comment.body}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default CommentCard;
