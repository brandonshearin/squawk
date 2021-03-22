import React, { createElement, useState, useContext } from "react";
import { Comment, Tooltip, Avatar, List, Input, Button, Rate } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";

const { TextArea } = Input;

const EDIT_REVIEW = gql`
  mutation EditReview($id: String!, $content: String, $rating: Float!) {
    editReview(id: $id, content: $content, rating: $rating) {
      content
      rating
      id
    }
  }
`;

export default function Review({ review, onDelete, session }) {
  const { userEmail, id } = review;
  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const [editReview, { data }] = useMutation(EDIT_REVIEW, {
    update: (_, { data }) => {
      // todo, maybe i dont need this?
      console.log(data);
    },
  });

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
  ];

  return (
    <List.Item
      actions={[
        <Button
          type="link"
          hidden={review.userId !== session?.user.id}
          key="list-edit"
          onClick={() => {
            if (editing) {
              // submit
              editReview({
                variables: {
                  rating,
                  content: editedContent,
                  id,
                },
              });
              setContent(editedContent);
              setEditing(false);
            } else {
              setEditing(true);
            }
          }}
        >
          {editing ? "finish" : "edit"}
        </Button>,
        <Button
          type="link"
          key="list-delete"
          hidden={review.userId !== session?.user.id}
          onClick={() => {
            if (editing) {
              // cancel the edit
              setEditing(false);
            } else {
              // delete
              onDelete({
                variables: {
                  id,
                },
              });
            }
          }}
          style={{ color: "red" }}
        >
          {editing ? "cancel" : "delete"}
        </Button>,
      ]}
    >
      <Comment
        actions={actions}
        author={<a>{userEmail}</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          editing ? (
            <>
              <TextArea
                autoSize
                defaultValue={content}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <Rate onChange={(value) => setRating(value)} value={rating} />
            </>
          ) : (
            <>
              <p>{content}</p>
              <Rate disabled value={rating} />
            </>
          )
        }
        datetime={
          <Tooltip title={new Date(review.createdAt).toDateString()}>
            <span>{moment(new Date(review.createdAt)).fromNow()}</span>
          </Tooltip>
        }
      />
    </List.Item>
  );
}
