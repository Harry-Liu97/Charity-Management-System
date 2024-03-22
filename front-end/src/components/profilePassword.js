import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Descriptions, Input, InputNumber, Form, Button, Typography, Divider, Avatar, Select, message } from 'antd';

const localURL = 'http://localhost:8090/';

function ProfilePassword () {
  const navigate = useNavigate();
  const id = sessionStorage.getItem('id');
  const role = sessionStorage.getItem('role');
  const [profile, setProfile] = useState({});
  const [password, setPassword] = useState('');
  const [passwordWeak, setPasswordWeak] = useState(true)
  // --- styles 
  const pageStyle = {
    width: '80%',
    margin: 'auto'
  }
  
  const titleStyle = {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'
  }

  // check valid password: 1. length > 4;  2.combination of letters and numbers
  function handlePasswordChange (e) {
    const tempPassword = e.target.value;
    const numReg =/^[0-9]*$/;
    const letterReg=/^[A-Za-z]+$/;
    if (tempPassword.length > 4 && !numReg.test(tempPassword) && !letterReg.test(tempPassword)) {
      setPasswordWeak(false);
      setPassword(tempPassword);
    } else {
      setPasswordWeak(true);
    }
  }

  // send new password to backend
  function changePwd () {
    axios.post(localURL+'user/update', {
      'id': profile.id,
      'no': profile.no,
      'password': password,
      'role': role
    })
    .then((res) => {
      console.log('pwd res: ',res);
      if (res.status !== 200) {
        alert('send new Backend failed.');
      }
    })
  }

  // get profile
  function fetchProfile () {
    axios.get(localURL + 'info/findByNo?no=' + id)
    .then(res => {
      if (res.status === 200) {
        console.log('fetch Profile data: ', res.data);
        setProfile(res.data.data);
      } else {
        alert('😵‍💫 fetchProfile Failed');
      }
    })
  }
  useEffect(() => {
    fetchProfile();
    document.title = "Change Password";
    return () => {
      document.title = 'HyruleCastle - Step into a world of hearts';
    };
  }, []);
  return (
    <div style={pageStyle}>
      <div
        style={ titleStyle }>
          <Typography.Title style={{ marginBottom: '0px' }}>Change Password</Typography.Title>
          <Button onClick={() => { (navigate('/Profile')) }}
            style={{ marginBottom: '0px' }}>
            Back
          </Button>
        </div>
      <Divider style={{ marginTop: '5px' }} />

      <Form
          name='basicPassword' 
          key="basicPassword"
          style={{ width: '60%', margin: 'auto', display: 'block' }}>
          <Form.Item label='new password'>
            <Input.Password 
            onChange={(e) => { handlePasswordChange (e) }}/>
            <p style={{ margin:'0', padding: '5px 0px' }}>length should be greater than 4</p>
            <p style={{ margin:'0', padding: '0' }}>combination of numbers and letters</p>
            <Button type="primary"
              onClick = {() => { changePwd() }}
              style={{ marginTop: '15px' }}
              disabled={passwordWeak}>
              Set New Password
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}

export default ProfilePassword;