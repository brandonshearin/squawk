import { Tooltip, List } from "antd";
import SquawkComment from "./comment";

export default function CommentList() {
  return(
    <List header="Comments" itemLayout="vertical">
      <SquawkComment />
      <SquawkComment />
      <SquawkComment />
    </List>
  );
}
