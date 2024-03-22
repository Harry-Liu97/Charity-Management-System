import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import styles from "./register.module.scss";
import { message, Form, Input } from "antd";
import axios from "axios";
const FormItem = Form.Item;

function SignIn({ onSuccess }) {
  const navigate = useNavigate();
  const [no, setNo] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const [deviceWidth, setDeviceWidth] = React.useState(
    document.documentElement.clientWidth || window.innerWidth
  );
  const login = (values) => {
    for (let val in values) {
      if (!values[val]) {
        message.error("not sufficient information is filled");
        break;
      }
    }
  };
  const submit = () => { //Login && submit
    axios
      .post("http://localhost:8090/user/login", {
        no: no,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 400 && no !== "" && password !== "") {
          message.error("Wrong account name or password");
        }
        if (res.data.code === 200) {
          message.success("✨Login successfully");
          sessionStorage.setItem('num', res.data.data.id);
          sessionStorage.setItem("id", res.data.data.no);
          sessionStorage.setItem("role", res.data.data.role);
          navigate("/Home");
        }
      });
  };

  useEffect(() => {
    // Gets the size of the browser window when the page changes
    window.addEventListener("resize", () => {
      setDeviceWidth(document.documentElement.clientWidth || window.innerWidth);
    });
  }, [deviceWidth]);

  return (
    <div className={styles.registerContent}>
      <div
        className={styles.registerBox}
        style={deviceWidth < 750 ? { width: "100%" } : { width: "50vh" }}
        data-testid="signin"
      >
        <Typography id="signinFormLabel" variant="h4">
          {" "}
          Login Here{" "}
        </Typography>
        <Form
          className={styles.registerForm}
          form={form}
          layout="vertical"
          onFinish={login}
          requiredMark={false}
        >

          <FormItem
            className={styles.registerFormItem}
            label="Account Name"
            name="name"
          >
            <Input
              className={styles.registerInput}
              value={no}
              onChange={(e) => setNo(e.target.value)}
            />
          </FormItem>
          <FormItem
            className={styles.registerFormItem}
            label="Password"
            name="password"
          >
            <Input.Password
              className={styles.registerInput}
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <button
            htmltype="submit"
            className={styles.registerButton}
            onClick={() => {
              submit();
            }}
          >
            Login
          </button>
        </Form>
        <p>
          Doesn't have an Account?{" "}
          <span>
            <Link to="/Register">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
