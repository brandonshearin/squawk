import React, { createElement, useState, useContext } from "react";
import { Comment, Tooltip, Avatar, List, Input, Button } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../../hooks/UserContext";

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

export default function Review({ review, onDelete }) {
  const { userEmail, rating, id } = review;
  const [content, setContent] = useState(review.content);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const { currentUser } = useContext(UserContext);

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
          hidden={review.userId !== currentUser?.id}
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
          hidden={review.userId !== currentUser?.id}
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
            <TextArea
              autoSize
              defaultValue={content}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p>{content}</p>
          )
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </List.Item>
  );
}
