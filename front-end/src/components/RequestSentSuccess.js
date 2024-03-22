import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
function RequestSentSuccess () {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status='success'
        title='Your request has been sent. Please be patient and wait for a reply.'
        extra={[
          <Button onClick={() => { navigate('/Request') }}>See my requests</Button>
        ]}
      />
    </>
  )
}

export default RequestSentSuccess;