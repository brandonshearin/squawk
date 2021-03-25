import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

export function ProfileSteps() {
  return (
    <Steps>
      <Step status="finish" title="Basic info" icon={<UserOutlined />} />
      <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
      <Step status="wait" title="Done" icon={<SmileOutlined />} />
    </Steps>
  );
}
