import { Row, Col, List, Button, Input, Space, Rate } from "antd";

import Review from "./Review";
const { TextArea } = Input;
import { useState } from "react";

import { gql, useMutation } from "@apollo/client";

const ADD_REVIEW = gql`
  mutation AddReview($data: AddReviewInput!) {
    addReview(data: $data) {
      id
      userEmail
      content
      rating
    }
  }
`;
const ReviewListHeader = ({ organizationId }) => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [showTextArea, setShowTextArea] = useState(false);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(3);

  const [addReview, { data }] = useMutation(ADD_REVIEW);
  const submitReview = () => {
    addReview({
      variables: {
        data: {
          organizationId,
          content: text,
          rating: rate,
        },
      },
    });
    console.log(text, rate, organizationId);
  };

  return (
    <>
      <Row align={"middle"} justify={"space-between"}>
        <Col>Reviews</Col>
        <Col>
          <Button
            type={"primary"}
            onClick={() => setShowTextArea(!showTextArea)}
            hidden={showTextArea}
          >
            Add Review
          </Button>
        </Col>
      </Row>
      <br />
      {showTextArea && (
        <>
          <Space direction={"vertical"} style={{ width: "100%" }}>
            <Row justify={"space-around"}>
              <Col xs={23}>
                <TextArea
                  autoSize={{ minRows: 4 }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Col>
            </Row>
            <Row justify={"end"}>
              <Col xs={6}>
                <Rate
                  tooltips={desc}
                  onChange={(value) => setRate(value)}
                  value={rate}
                />
              </Col>
              <Col xs={6}>
                <Button type="primary" onClick={submitReview}>
                  Leave Review!
                </Button>
              </Col>
            </Row>
          </Space>
        </>
      )}
    </>
  );
};

export default function ReviewList({ reviews }) {
  const list = reviews.reviews || [];
  const organizationId = list[0].organizationId;

  return (
    <List
      header={<ReviewListHeader organizationId={organizationId} />}
      itemLayout="vertical"
    >
      {list.map((review) => {
        return <Review review={review} key={review.id} />;
      })}
    </List>
  );
}
