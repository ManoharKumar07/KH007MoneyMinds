import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="formbox">
        <div className="form-container">
          <Form layout="vertical" className="formw" onFinish={onfinishHandler}>
            <h1 className="mb-4 text-2xl font-medium">Register Form</h1>
            <Form.Item label="Name" name="name">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <Link to="/login">
              <p className="text-blue-700"> Already user login here?</p>
            </Link>
            <br />
            <button className="btn btn-primary bg-blue-500" type="submit">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
