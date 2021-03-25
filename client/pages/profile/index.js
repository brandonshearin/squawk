import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { Button, Form, Input, Row, Col, Space, Radio } from "antd";
import { SquawkTransfer } from "../../components/profile/transfer";
import { ProfileSteps } from "../../components/profile/profile-steps";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const tailLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { offset: 6, span: 16 },
  },
};

const randomUsername = () => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: " ",
  });
  return randomName;
};

const options = [
  { label: "Parent", value: "Parent" },
  { label: "Patient", value: "Patient" },
  { label: "Professional", value: "Professional" },
];

export default function Profile() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  // const onChange = (changed, all) => {

  // };

  const changeName = () => {
    const randomName = randomUsername();
    form.setFieldsValue({ user: { username: randomName } });
  };

  return (
    <>
      
      <Row align={"middle"} justify="center" style={{ marginTop: "18px" }}>
      
        <Col span={12}>
        <ProfileSteps />
          <Form
            form={form}
            {...formItemLayout}
            onFinish={onFinish}
            // onFieldsChange={onChange}
          >
            <Form.Item label="Username">
              <Space size="large">
                <Form.Item name={["user", "username"]} noStyle>
                  <Input />
                </Form.Item>
                <Button type="primary" onClick={changeName}>
                  Random username
                </Button>
              </Space>
            </Form.Item>

            <Form.Item name={["user", "email"]} label="Email">
              <Input />
            </Form.Item>

            <Form.Item name={["user", "phone"]} label="Phone">
              <Input />
            </Form.Item>

            <Form.Item name={["user", "parentOrPatient"]} label="Are you a: ">
              <Radio.Group
                options={options}
                onChange={() => {}}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>

          <SquawkTransfer title="Which Therapeutic Boarding Schools have you or your child enrolled in?" />
          <SquawkTransfer title="Which Residential Treatment Centers have you or your child enrolled in?" />
        </Col>
      </Row>
    </>
  );
}
