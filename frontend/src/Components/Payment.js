import React from "react";
import { InnerLayout } from "../styles/Layouts";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";

function Payment({ setActive }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      // Make API call to update fund balance
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/updatefund",
        {
          amount: values.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        // Reset the form after successful submission
        form.resetFields();
        // Navigate to dashboard
        setActive(1);
        window.location.reload();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("An error occurred. Please try again later.");
      console.error(error);
      navigate("/login"); // Navigate to login page in case of error
    }
  };

  return (
    <PaymentStyled>
      <InnerLayout>
        <div className="fundcontainer">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="amount"
              label="Amount to Send"
              rules={[{ required: true, message: "Please enter an amount" }]}
            >
              <Input type="number" placeholder="Enter amount" />
            </Form.Item>

            <Form.Item>
              <button onClick={() => setActive(7)} className="add-money-button">
                Send Money
              </button>
            </Form.Item>
          </Form>
        </div>
      </InnerLayout>
    </PaymentStyled>
  );
}

const PaymentStyled = styled.div`
  .fundcontainer {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  button.add-money-button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    margin: 0 auto;
    margin-left: 100px;
  }
`;

export default Payment;
