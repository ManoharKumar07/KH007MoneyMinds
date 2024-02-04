import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import styled from "styled-components";

const Complainttab = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Handle complaint submission logic here
    console.log("Complaint submitted:", values);
    message.success("Complaint submitted successfully!");
    form.resetFields(); // Reset form fields after submission
  };

  return (
    <ComplainttabStyled>
      <div className="complaint-container">
        <h2 className="complaint-heading">Raise a Complaint</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="complaint-form"
        >
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Subject is required" }]}
          >
            <Input placeholder="Enter the subject of your complaint" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter details of your complaint"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit Complaint
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ComplainttabStyled>
  );
};

const ComplainttabStyled = styled.div`
  .complaint-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    padding: 20px;
    width: 100%;

    .complaint-heading {
      margin-bottom: 20px;
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--primary-color2);
    }

    .complaint-form {
      width: 100%;

      .ant-form-item-label {
        text-align: left;
      }

      .ant-form-item-control {
        text-align: left;
      }

      .submit-button {
        background-color: #4caf50;
        border-color: #4caf50;
        color: #fff;

        &:hover {
          background-color: #45a049;
          border-color: #45a049;
        }
      }
    }
  }
`;

export default Complainttab;
