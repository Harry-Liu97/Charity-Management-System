import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Divider, Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import RequestList from './RequestList';
const pageStyle = {
  width: '80%',
  margin: 'auto'
}

const titleStyle = {
  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
}
const localURL = 'http://localhost:8090/';

// '0': In Progress,   '1': Agree,  '2': Reject
function Request () {
  const navigate = useNavigate();
  const id = sessionStorage.getItem('id');  // current user's no
  const [send, setSend] = useState([]);
  const [receive, setReceive] = useState([]);
  const [progressSent, setProgressSent] = useState([]);
  const [progressReceive, setProgressReceive] = useState([]);
  const [agreeSent, setAgreeSent] = useState([]);
  const [agreeReceive, setAgreeReceive] = useState([]);
  const [rejectSent, setRejectSent] = useState([]);
  const [rejectReceive, setRejectReceive] = useState([]);

  let allInfo = {}; // store all accounts' data {'${no}': {role: '', name:''} }
  // get all
  function fetchAllInfo () {
    axios.get(localURL + 'info/list' )
    .then((res) => {
      console.log('fetchAllInfo:', res.data.data);
      const infoList = res.data.data;
      for(let i = 0; i < infoList.length; i++) {
        console.log(infoList[i]);
        allInfo[`${infoList[i].no}`] = {role: infoList[i].role, name: infoList[i].name};
      }
      console.log('allInfo:', allInfo);
    })
  }

  const { token } = theme.useToken();
  // style for Collapse
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  const getInProgressItems = (panelStyle) => [
    {
      key: '1',
      label: 'in progress Receive',
      children: <RequestList list={progressReceive} typeRorS='receive' typeProgress='inProgress' allInfo={allInfo} />,
      style: panelStyle
    },
    {
      key: '2',
      label: 'in progress Send',
      children: <RequestList list={progressSent} typeRorS='send' typeProgress='inProgress' allInfo={allInfo} />,
      style: panelStyle,
    }
  ];

  const getAgreeItems = (panelStyle) => [
    {
      key: '1',
      label: 'agree Receive',
      children: <RequestList list={agreeReceive} typeRorS='receive' typeProgress='agree' allInfo={allInfo} />,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'agree Send',
      children: <RequestList list={agreeSent} typeRorS='send' typeProgress='agree' allInfo={allInfo} />,
      style: panelStyle,
    }
  ]

  const getRejectItems = (panelStyle) => [
    {
      key: '1',
      label: 'reject Receive',
      children: <RequestList list={rejectReceive} typeRorS='receive' typeProgress='reject' allInfo={allInfo} />,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'reject Send',
      children: <RequestList list={rejectSent} typeRorS='send' typeProgress='reject' allInfo={allInfo} />,
      style: panelStyle,
    }
  ]
  // --------- '0': In Progress,   '1': Agree,  '2': Reject -------
  // sent
  function fetchSendRequest () {
    axios.post(localURL + 'message/pagingQuery', {
      "pageSize": "100",
      "pageNum":"1",
      "params": {
        "sender": id,
        "receiver": "",
        "status": ""
      }
    })
    .then((res) => {
      if (res.status === 200) {
        // console.log('request - Send: ', res.data.data);  // messages sent by user
        setSend(res.data.data);
        const sList = res.data.data;
        const sProgressList = [];
        const sAgreeList = [];
        const sRejectList = [];
        // '0': In Progress,   '1': Agree,  '2': Reject
        for (let i = 0; i < sList.length; i++ ) {
          if (sList[i].status === 0) {
            sProgressList.push(sList[i]);
          } else if (sList[i].status === 1) {
            sAgreeList.push(sList[i]);
          } else if (sList[i].status === 2) {
            sRejectList.push(sList[i]);
          }
        }
        setProgressSent(sProgressList);
        setAgreeSent(sAgreeList);
        setRejectSent(sRejectList);
      } else {
        alert('😵‍💫 Send Failed');
      }
    })
  }

  // receive
  function fetchReceiveRequest () {
    axios.post(localURL + 'message/pagingQuery', {
      "pageSize": "100",
      "pageNum":"1",
      "params": {
        "sender": "",
        "receiver": id,
        "status": ""
      }
    })
    .then((res) => {
      if (res.status === 200) {
        // console.log('request - Receive data: ', res.data.data);  // messages received by user
        setReceive(res.data.data);
        const rList = res.data.data;
        const rProgressList = [];
        const rAgreeList = [];
        const rRejectList = [];
        // '0': In Progress,   '1': Agree,  '2': Reject
        for (let i = 0; i < rList.length; i++ ) {
          if (rList[i].status === 0) {
            rProgressList.push(rList[i]);
          } else if (rList[i].status === 1) {
            rAgreeList.push(rList[i]);
          } else if (rList[i].status === 2) {
            rRejectList.push(rList[i]);
          }
        }

        setProgressReceive(rProgressList);
        setAgreeReceive(rAgreeList);
        setRejectReceive(rRejectList);
      } else {
        alert('😵‍💫 Receive Failed');
      }
    })
  }


  useEffect(() => {
    fetchSendRequest();
    fetchReceiveRequest();
    fetchAllInfo();
    document.title = "Requests";
    return () => {
      document.title = 'HyruleCastle - Step into a world of hearts';
    };
  }, []);
  return (
    <div style={ pageStyle }>
      <div style={ titleStyle }>
        <Typography.Title style={{ marginBottom: '0px' }}>Requests</Typography.Title>
      </div>
      <Divider />

      <div>
        <Typography.Title  level={4}>🌟 To-do Requests</Typography.Title>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{
            background: token.colorBgContainer,
          }}
          items={getInProgressItems(panelStyle)}
        />
      </div>
      <Divider dashed='true'/>
      <div>
        <Typography.Title  level={4}>✅ Successed Requests</Typography.Title>
        <Collapse
          bordered={false}
          defaultActiveKey={['2']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{
            background: token.colorBgContainer,
          }}
          items={getAgreeItems(panelStyle)}
        />
      </div>
      <div>
        <Typography.Title  level={4}>❌ Rejected Requests</Typography.Title>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{
            background: token.colorBgContainer,
          }}
          items={getRejectItems(panelStyle)}
        />
      </div>
    </div>
  )
}

export default Request;