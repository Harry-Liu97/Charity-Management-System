

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import styles from "./register.module.scss";
import { message, Form, Input, Radio, Steps, Button, Modal, Space , Select} from "antd";
import axios from "axios";
const { Option } = Select;
const FormItem = Form.Item;

function SignUp({ onSuccess }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [form] = Form.useForm();
  const [ac, setAc] = useState("");
  const [status, setStatus] = useState(0);
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState({'ac':'', 'password': '', 'usertype':''})
  const [deviceWidth, setDeviceWidth] = React.useState(
    document.documentElement.clientWidth || window.innerWidth
  );

    // You need / You can provide / Root
    function getDescriptionDonationTitle (ut) {
      if (ut === '1') {
        return 'You need';
      } else if (ut === '2') {
        return 'You can provide';
      } else if (ut === '0') {
        return 'root';
      } else {
        return `wrong user type : ${ut}`
      }
    }

      // donation type
  const handleSelectChange = (value) => {
    setCategory(value)
  };

  // page 1: register a account, page 2: submit a profile
  const [page, setPage] = useState("1");

  // register new account
  const register = () => { 
    console.log(category)
    if (category !== '' && email !== '') {  // There are not blanks in step 2
      if (status === 1) {
        axios.post("http://localhost:8090/user/register", {
          'no': info.ac,
          'password': info.password,
          'role': parseInt(info.usertype)
        })
        .then(res => {
          message.success("Register successfully")
          setStatus(0)
          navigate('/Login')
          axios.post("http://localhost:8090/user/login", {
            'no': info.ac,
            'password': info.password,
          })
          .then(res => {
              console.log(res.data)
              if(res.data.code === 400 && info.name !== '' && info.password !=='') {
                  message.error('Auto sign in failed (after register successfully');
              } 
              if(res.data.code === 200) {
                  sessionStorage.setItem('num', res.data.data.id);
                  sessionStorage.setItem('id', res.data.data.no);
                  sessionStorage.setItem('role', res.data.data.role);
                  navigate('/RegisterSuccess')
                  axios.post('http://localhost:8090/info/update', {
                    'id':parseInt(sessionStorage.getItem('num')),
                    'no': sessionStorage.getItem('id'),
                    'role': parseInt(sessionStorage.getItem('role')),
                    'name': sessionStorage.getItem('id'),
                    'email': email,
                    'target': category.join()
                  })
                  .then(res => {
                    console.log('hi')
                  })
              }
          })
        })
      } else 
      message.error('You can\'t sign up with existed account')
      return
    } else {
      message.error("not sufficient information is filled")
      return
    }
   
  };

  const checkDuplicate = () => {
    axios.get(`http://localhost:8090/user/findByNo?no=${ac}`).then((res) => {
      console.log(res.data);
      if (res.data.code === 400) {
        message.success("The name could be used");
        setStatus(1);
      } else {
        message.warning("The name already exists");
      }
    });
  };

  const nextStep = () => {
    const passwordValue = form.getFieldValue('password');
    const usertype = form.getFieldValue('usertype');
    if (ac === '' || !passwordValue || passwordValue.length <= 0) {
      message.error("not sufficient information is filled");
      return
    } else {
      setStep(1)
      setInfo({'ac': ac, 'password': passwordValue, 'usertype': usertype})
    }

  }

  const lastStep = () => {
    console.log(category)
      setStep(-1)
    

  }


  useEffect(() => {
    // Gets the size of the browser window when the page changes
    window.addEventListener("resize", () => {
      setDeviceWidth(document.documentElement.clientWidth || window.innerWidth);
    });
  }, [deviceWidth]);

  console.log(step, "step");
  return (
    <div className={styles.registerContent}>
      <div></div>
      <div
        className={styles.registerBox}
        style={deviceWidth < 750 ? { width: "100%" } : { width: "50vh" }}
        data-testid="signup"
      >
        <Typography id="signupFormLabel" variant="h4">
          {" "}
          Register Now{" "}
        </Typography>
        <Steps
          size="small"
          className={styles.steps}
          current={step}
          items={[
            {
              title: "step1",
            },
            {
              title: "step2",
            },
          ]}
        />
        
        {/* Condition 1 */}
        {step !== 1 && (
          <Form
          className={styles.registerForm}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <FormItem
            className={styles.registerFormItem}
            label="Account Name"
            name="name"
          >
            <Input
              className={styles.registerInput}
              value={ac}
              onChange={(e) => setAc(e.target.value)}
              onBlur={checkDuplicate}
              required
            />
          </FormItem>

          <FormItem
            className={styles.registerFormItem}
            label="Password"
            name="password"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) { //form Form user-defined verification
                  const numReg = /^[0-9]*$/;
                  const letterReg = /^[A-Za-z]+$/;
                  const password = getFieldValue("password");
                  if (
                    (password.length <= 4 && password.length > 0) ||
                    numReg.test(password) ||
                    letterReg.test(password)
                  ) {
                    return Promise.reject(
                      new Error(
                        "Your password needs to contain at least four characters, including at least one uppercase letter and one lowercase letter. "
                      )
                    );
                  }
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input.Password
              className={styles.registerInput}
              maxLength={16}
              required
            />
          </FormItem>

          <FormItem
            initialValue={"1"}
            className={styles.registerFormItem}
            label="User Type"
            name="usertype"
          >
            <Radio.Group>
              <Radio value="1">Charity</Radio>
              <Radio value="2">Sponsor</Radio>
            </Radio.Group>
          </FormItem>
          <Button
                      htmltype="next"
                      onClick={() => {nextStep()}}
                      className={styles.registerButton}
                    >
                      Next
                    </Button>
        </Form>
        )}

        {/* Condition 2 */}
        {step === 1 && (
                    <Form
                    className={styles.registerForm}
                    form={form}
                    layout="vertical"
                    // onValuesChange={onValuesChange}
                    onFinish={register}
                    requiredMark={false}
                  >
      
          
                    <FormItem
                      className={styles.registerFormItem}
                      label="Email"
                      name="email"
                    >
                      <Input
                        className={styles.registerInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormItem>

                    <Form.Item 
            label={getDescriptionDonationTitle(info.usertype)}
            name='target'
            rules={[
              {
                required: true,
                message: 'Please select at least one option!',
              },
            ]}
            >
            <Select
              mode="multiple"
              style={{
                width: '300px',
              }}
              placeholder="select one donation type"
              onChange={handleSelectChange}
              optionLabelProp="label"
            >
              <Option value="0" label="food">
                <Space>
                  <span role="img" aria-label="Food">
                    🍔
                  </span>
                  Food
                </Space>
              </Option>
              <Option value="1" label="cloth">
                <Space>
                  <span role="img" aria-label="Cloth">
                    🧣
                  </span>
                  Cloth
                </Space>
              </Option>
              <Option value="2" label="money">
                <Space>
                  <span role="img" aria-label="Money">
                    💰
                  </span>
                  Money
                </Space>
              </Option>
              <Option value="3" label="others">
                <Space>
                  <span role="img" aria-label="Others">
                    🌜
                  </span>
                  Others
                </Space>
              </Option>
            </Select>
          </Form.Item>
          
                    <Button
                      htmltype="previous"
                      onClick={() => {lastStep()}}
                      className={styles.registerButton}
                    >
                      Previous
                    </Button>

                    <Button
                      htmltype="submit"
                      onClick={register}
                      className={styles.registerButton}
                      style={{ marginTop: '20px' }}
                    >
                      Register
                    </Button>
                  </Form>
        )}
        
        <p>
          Already have an Account?{" "}
          <span>
            <Link to="/Login">Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
