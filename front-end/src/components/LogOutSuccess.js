import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
function LogOutSuccess () {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status='success'
        title='See you next time!'
        extra={[
          <Button onClick={() => { navigate('/home') }}>Back to HomePage</Button>
        ]}
      />
    </>
  )
}

export default LogOutSuccess;