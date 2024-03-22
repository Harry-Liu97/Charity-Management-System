import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function RegisterSuccess () {
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate()

  // 1: charity, 2: sponsor, 0: root
  const subtitle = (role) => {
    if (role === '1') {
      return 'To help you easily, we need you to fill your personal information';
    } else if (role === '2') {
      return 'To help others easily, we need you to fill your personal information';
    }
  };
  return (
    <>
      <Result
    status="success"
    title="🎉Register Successfully"
    subTitle={subtitle}
    extra={[
      <Button style={{color: '#1BC2BC'}} key="console"
        onClick={() => { navigate('/ProfileEdit') }}>
        Complete personal profile
      </Button>,
      <Button key="buy" onClick={() => {navigate('/home')}}>Go home</Button>,
    ]}
  />
    </>
  )
}

export default RegisterSuccess;