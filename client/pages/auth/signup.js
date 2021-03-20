import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
import { Form, Input, Button, Typography, Row, Col } from "antd";
const { Title } = Typography;
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/organizations");
    },
  });

  const onSubmit = async (values) => {
    console.log(email);
    console.log(password);
    await doRequest();
  };

  const setValues = (changed, all) => {
    const { email, password } = all;
    setEmail(email);
    setPassword(password);
  };
  
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <Row justify="space-around" align="middle" style={{ marginTop: "100px" }}>
      <Col>
        {/* <Title>Sign Up</Title> */}
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          onValuesChange={setValues}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          {errors}
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;
