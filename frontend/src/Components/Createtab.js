import React from "react";
import { Col, Form, Input, Row, message, Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateRoscaForm = () => {
  const { user } = useSelector((state) => state.user);
  const [form] = Form.useForm(); // Access the form instance

  const handleFinish = async (values) => {
    try {
      const { roscaName, size, amount, isAdmin, duration, aadharNo } = values;

      const newRosca = {
        roscaName,
        size,
        amount,
        isAdmin,
        duration,
        aadharNo,
        members: [{ name: user.name, payment: false }],
        bid: [],
      };

      // API call to store the ROSCA in the database
      await axios.post(
        "http://localhost:8080/api/v1/user/createrosca",
        newRosca
      );

      // Clear the form after successful submission
      form.resetFields();

      // Handle the response as needed
      message.success("ROSCA created successfully!");
    } catch (error) {
      console.error("Error creating ROSCA:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} className="p-5">
      <Row gutter={20}>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label="Rosca Name"
            name="roscaName"
            required
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input type="text" placeholder="Enter ROSCA name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label="Size"
            name="size"
            required
            rules={[{ required: true, message: "Size is required" }]}
          >
            <Input type="number" placeholder="Enter ROSCA size" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item
            label="Amount"
            name="amount"
            required
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <Input type="number" placeholder="Enter ROSCA amount" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} md={24} lg={8}>
          <Form.Item label="Is Admin" name="isAdmin" initialValue={false}>
            <Input type="checkbox" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item label="Duration" name="duration">
            <Input type="text" placeholder="Enter ROSCA duration" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Form.Item label="Aadhar No" name="aadharNo">
            <Input type="number" placeholder="Enter Aadhar number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} md={24} lg={8}>
          <Form.Item>
            <Button
              className="btn btn-primary form-btn bg-green-500 p-b-3"
              htmlType="submit"
            >
              Create ROSCA
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateRoscaForm;
