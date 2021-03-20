import { Row, Col, List, Button, Input, Space, Rate } from "antd";

import Review from "./Review";
const { TextArea } = Input;
import { useContext, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../../hooks/UserContext";
const ADD_REVIEW = gql`
  mutation AddReview($data: AddReviewInput!) {
    addReview(data: $data) {
      id
      userEmail
      userId
      organizationId
      content
      rating
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: String!) {
    deleteReview(id: $id)
  }
`;

const ReviewListHeader = ({ organizationId, addReview }) => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [showTextArea, setShowTextArea] = useState(false);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(3);

  const { currentUser } = useContext(UserContext);

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
            disabled={!currentUser}
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

export default function ReviewList({ reviews, orgId }) {
  const [list, setList] = useState(reviews.reviews || []);

  const [addReview, { data, loading, error }] = useMutation(ADD_REVIEW, {
    update: (_, { data }) => {
      const { addReview: newReview } = data;
      setList([newReview, ...list]);
    },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    update: (_, { data }) => {
      setList(list.filter((item) => item.id !== data.deleteReview));
    },
  });

  return (
    <List
      header={<ReviewListHeader organizationId={orgId} addReview={addReview} />}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <Review review={item} key={item.id} onDelete={deleteReview} />
      )}
    ></List>
  );
}
