import React, { useState } from "react";
import { Transfer, Typography } from "antd";
const { Title } = Typography;
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

const initialTargetKeys = mockData
  .filter((item) => +item.key > 10)
  .map((item) => item.key);

export function SquawkTransfer({ title }) {
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log("sourceSelectedKeys:", sourceSelectedKeys);
    console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  return (
    <>
      <Title level={5}>{title}</Title>
      <Transfer
        dataSource={mockData}
        titles={["Source", "Target"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        onScroll={onScroll}
        render={(item) => item.title}
      />
    </>
  );
}
