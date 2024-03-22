import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Space, Button, message } from 'antd';

function RequestList ({ list, typeRorS, typeProgress }) {
  console.log('RequestList - list: ', list, 'typeRorS:', typeRorS, 'typeProgress:', typeProgress);
  const localURL = 'http://localhost:8090/';
  const targetDict = {'0': 'food', '1': 'cloth', '2': 'money', '3': 'other'};
  const targetReverseDict = {'food': '0', 'cloth': '1', 'money': '2', 'other': '3'};

  // '0': In Progress,   '1': Agree,  '2': Reject
  // ------------- '1': accept -------------
  /*
    if user click 'accept', first update message's status as '1'
    then we check whether sender or receiver is sponsor, 
    then get this sponsor's point data,
    then put updated sponsor point data to backend.
  */
  const messageUpdateStatus = async(request)=>{
    const res = await axios.post(localURL + 'message/update', {
      "id": request.id,
      "sender": request.send,
      "receiver": request.receive,
      "comment": request.comm,
      "status": 1,
      "target": request.tar
    })
    if (res.status === 200 && res.data.code !== 400) {
      console.log('accept data: ', res);
      message.success('🎉 Accept ');
    } else {
      message.error('Accept Failed.');
    }
  }
  const updateUserPoint=async (no)=>{
    const res = await axios.get(localURL + 'point/findByNo?no=' + no);
    if (res.status === 200 && res.data.code !== 400) {
      const updateRes = await axios.post(localURL + 'point/update', {
        "id": res.data.data.id,
        "no": res.data.data.no,
        "role": res.data.data.role,
        "success": res.data.data.success + 1,
        "points": res.data.data.points + 1
      })
      console.log('update point', updateRes);
    } else {
      alert('get point failed');
    }
  }
  async function acceptRequest (request) {
    await messageUpdateStatus(request);
    await updateUserPoint(request.sender);
    await updateUserPoint(request.receiver);
    window.location.reload();
  } 

  function updatePoint (no) {
    console.log('func update...');
    // first get point by no
    axios.get(localURL + 'point/findByNo?no=' + no)
    .then((res) => {
      if (res.status === 200 && res.data.code !== 400) {
        console.log('get point', res);
        axios.post(localURL + 'point/update', {
          "id": res.data.data.id,
          "no": res.data.data.no,
          "role": res.data.data.role,
          "success": res.data.data.success + 1,
          "points": res.data.data.points + 1
        })
        .then((res) => {
          console.log('update point', res);
        })
      } else {
        alert('get point failed');
      }
    })
  }

  // ------------- '2': reject -------------
  /*
    if user click 'reject' or 'cancel' button,
    then we update message's status to '2'
    then reload page
  */
  function rejectRequest (request) {
    axios.post(localURL + 'message/update', {
      "id": request.id,
      "sender": request.send,
      "receiver": request.receive,
      "comment": request.comm,
      "status": 2,
      "target": request.tar
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('reject data: ', res);
        message.success('🎉 Reject ');
        window.location.reload();
      } else {
        alert('Reject Failed.');
      }
    })
  } 


  /* 
  ------ return logic ------
    if (list.len == 0) {   do not have this (receive | send) (inProgress | accept | reject) type message
      (<p>No message</p>)
    } else {
      for each request in list {
        (<Card>sender, receiver, target</Card>)
      }
    }
  --- card's extra: card button ---
    if (inProgress and receive): show accept and reject button
    if (inProgress and send): show cancel(reject) button
    else: don't show button
  */
  return (
    <div>
      {
      list.length === 0
      ?
      <p>Currently no message of this type.</p>
      :
      list.map((r, i) => (
        <Card
          key={r.id}
          title={'Request'}
          extra={
            typeProgress === 'inProgress' ?
            typeRorS === 'receive' ?
              <div >
                <Button onClick={() => { acceptRequest(r) }}>Accept</Button>
                <Button onClick={() => { rejectRequest(r) }}>Reject</Button>
              </div>
              :
              <div>
                <Button onClick={() => { rejectRequest(r) }}>Cancel</Button>
              </div>
            :
            null
            }
          style={{
            width: 500,
          }}>
          <p>sender: {r.sender}</p>
          <p>receiver: {r.receiver}</p>
          {
            r.comment === null || r.comment === '' 
            ? <></>
            : <p>comment: {JSON.stringify(r.comment)}</p>
          }
          <p>target: {targetDict[r.target]}</p>
          
        </Card>
      ))
      }
    </div>
  )
}

export default RequestList;