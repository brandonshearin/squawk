import { Row, Col, List, Button, Input, Space, Rate, Skeleton } from "antd";

import Review from "./Review";
const { TextArea } = Input;
import { useContext, useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/client";

const GET_REVIEWS = gql`
  query GetReviews($id: String!) {
    get(id: $id) {
      reviews {
        id
        userId
        organizationId
        userEmail
        rating
        content
        createdAt
      }
    }
  }
`;

const ADD_REVIEW = gql`
  mutation AddReview($data: AddReviewInput!) {
    addReview(data: $data) {
      id
      userEmail
      userId
      organizationId
      content
      rating
      createdAt
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: String!) {
    deleteReview(id: $id)
  }
`;

const ReviewListHeader = ({ organizationId, addReview, session }) => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [showTextArea, setShowTextArea] = useState(false);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(3);

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
            disabled={!session?.user}
          >
            Add Review
          </Button>
        </Col>
      </Row>
      <br />
      {showTextArea && (
        <>
          <Space direction={"vertical"} style={{ width: "100%" }}>
            <Row>
              <Col span={24}>
                <TextArea
                  autoSize={{ minRows: 4 }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Col>
            </Row>
            <Row justify={"end"}>
              <Col>
                <Space>
                  <Rate
                    tooltips={desc}
                    onChange={(value) => setRate(value)}
                    value={rate}
                  />
                  <Button type="primary" onClick={submitReview}>
                    Leave Review!
                  </Button>
                </Space>
              </Col>
            </Row>
          </Space>
        </>
      )}
    </>
  );
};

export default function ReviewList({ orgId }) {
  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: { id: orgId },
  });
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(data?.get?.reviews);
  }, [loading]);

  const [session, sessionLoading] = useSession();
  const [addReview, { error: mutateError }] = useMutation(ADD_REVIEW, {
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
      header={
        <ReviewListHeader
          organizationId={orgId}
          addReview={addReview}
          session={session}
        />
      }
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <Review
          review={item}
          key={item.id}
          onDelete={deleteReview}
          session={session}
        />
      )}
    >
      <Skeleton loading={loading} />
    </List>
  );
}
