import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {isEmpty} from "lodash"
import { Image, Input, InputNumber, Form, Button, Typography, Divider, Avatar, Select, message, Space } from 'antd';
const { Option } = Select;

const localURL = 'http://localhost:8090/';
const pageStyle = {
  width: '80%',
  margin: 'auto'
}

const titleStyle = {
  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'
}

function ProfileEdit () {
  const [profile, setProfile] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
  const id = sessionStorage.getItem('id');

  function fetchProfile () {
    axios.get(localURL + 'info/findByNo?no=' + id)
    .then(res => {
      if (res.status === 200) {
        console.log('fetch Profile data: ', res.data);
        setProfile(res.data.data);
        setImageUrl(res.data.data.image)
      } else {
        alert('fetchProfile failed.');
      }
    })
  }
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

//   const  upload=()=>{
//     const uploadDom = document.getElementById("uploadInput");
//     uploadDom.click();
//  };
const loadFile=(e)=>{
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = function (e) {
      setImageUrl(e.target.result)
  };
}
  const onFinish = (values) => {
    console.log('Click Submit Success:', values);
    values.image = imageUrl;
    values.target = values.target.toString();
    const idInt = parseInt(profile.id);
    const roleInt = parseInt(role);
    const no = profile.no;
    const postObj = {'id': idInt, 'role': roleInt, 'no': no, ... values}
    console.log('Post new profile to backend: ', postObj);
    axios.post(localURL + 'info/update', postObj)
    .then((res) => {
      if (res.status === 200) {
        console.log('edit res: ', res);
        message.success('🎉 New Profile Saved');
      } else {
        alert('wrong profile');
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // donation type
  const handleSelectChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  // 1: charity, 2: sponsor, 0: root
  function getUserTypeStr (ut) {
    if (ut === '1') {
      return 'charity';
    } else if (ut === '2') {
      return 'sponsor';
    } else if (ut === '0') {
      return 'root';
    } else {
      return `wrong user type : ${ut}`
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);
  if(isEmpty(profile)) return null;
  return (
    <div style={ pageStyle }>
      <div style={ titleStyle }>
        <Typography.Title style={{ marginBottom: '0px' }}>Edit Profile</Typography.Title>
        <Button onClick={() => { (navigate('/Profile')) }}
          style={{ marginBottom: '0px' }}>
            Back
        </Button>
      </div>
      <Divider style={{ marginTop: '5px' }} />
      <Form name='basicEdit' 
        key="basicEdit"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{span: 8,}} wrapperCol={{span: 16,}}
        style={{maxWidth: 600,}}
        initialValues={profile}
        autoComplete='off'>
          <Form.Item
           label='Name'
           name="name"
           rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
           >
            <Input  />
          </Form.Item>
          <Form.Item 
          label='Phone'
          name="phone"
          >
            <Input  />
          </Form.Item>
          <Form.Item 
          label='Email'
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input corret email!',
            },
          ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label='Description'
            name="description">
            <Input.TextArea showCount maxLength={250} />
          </Form.Item>
          <Form.Item 
            label={getDescriptionDonationTitle(role)}
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
                width: '100%',
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
          <Form.Item          
            label='Image'
            name='image'>
            <input style={{display:"none"}} id="uploadInput" type="file" accept="image/*" onChange={loadFile} />
            <Button type="primary" onClick={()=>{ 
              const uploadDom = document.getElementById("uploadInput");
              uploadDom.click(); }}>
              Upload
            </Button>
            <div style={{ marginTop: '27px' }}> 
              {imageUrl&&<Image
              width={100}
              src={imageUrl}
            />}
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
      </Form>
    </div>
  )
}

export default ProfileEdit;