import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Checkbox, Descriptions, Input, InputNumber, Form, Button, Typography, Divider, Avatar, Select, message, Image, Modal } from 'antd';
import { textAlign } from '@mui/system';
import Item from 'antd/es/list/Item';
const { Option } = Select;
const localURL = 'http://localhost:8090/';
const pageStyle = {
  width: '80%',
  margin: 'auto'
}

const titleStyle = {
  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'
}

function MoreInfo () {
  const userNo = useParams().userno;
  const [profile, setProfile] = useState({});
  const [donationNumList, setDonationNumList] = useState([]);
  const [donationStrList, setDonationStrList] = useState([]);
  const [selected, setSelected] = useState([]);
  // for dialog
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const no = sessionStorage.getItem('id');  // current user's no
  const role = sessionStorage.getItem('role');  // current user's role   // 1: charity, 2: sponsor, 0: root
  const targetDict = {'0': 'food', '1': 'cloth', '2': 'money', '3': 'other'};
  const targetReverseDict = {'food': '0', 'cloth': '1', 'money': '2', 'other': '3'};

  // for checkbox
  const onCheckboxChange = (checkedValues) => {
    // console.log('checked = ', checkedValues);
    setSelected(checkedValues);
  };

  // get this user's profile
  function fetchProfile () {
    axios.get(localURL + 'info/findByNo?no=' + userNo)
    .then(res => {
      if (res.status === 200) {
        console.log('more Info - fetch Profile data: ', res.data);
        setProfile(res.data.data); // get current account's profile
        const dNumList = res.data.data.target.split(',');   // ['0', '1']
        const dStrList = dNumList.map((item)=>targetDict[item]); // ['food', 'cloth']
        setDonationNumList(dNumList);
        setDonationStrList(dStrList);
      } else {
        alert('😵‍💫 fetchProfile Failed');
      }
    })
  }

  // send request to this user    sender: current user
  async function sendRequest  (){
    for (let i = 0; i < selected.length; i++) {
      await axios.post(localURL + 'message/add', {
        "sender": no.toString(),
        "receiver": userNo.toString(),
        "comment": comment,
        "status": '0',
        "target": selected[i]
      })
      .then((res) => {
        if (res.status !== 200) {
          // alert('Request Sent Failed.');
          message.error('Request Sent Failed.');
        }
      })
    }
     message.success('send request successfully');
  } 

  // -------- ↓ functions for show profile ---------
  // 1: charity, 2: sponsor, 0: root
  function getUserTypeStr (ut) {
    if (ut === 1) {
      return 'Charity';
    } else if (ut === 2) {
      return 'Sponsor';
    } else if (ut === 0) {
      return 'root';
    } else {
      console.log('wrong user type', ut)
      return `wrong user type : ${ut}`
    }
  }
  // You need / You can provide / Root
  function getDescriptionDonationTitle (ut) {
    if (ut === 1) {
      return 'They need';
    } else if (ut === 2) {
      return 'They can provide';
    } else if (ut === 0) {
      return 'root';
    } else {
      return `wrong user type : ${ut}`
    }
  }
  // get profile name
  function getProfileName () {
    if (profile.name === '') { // if profile'name is empty, then show profile'no
      return profile.no;
    } else {
      return profile.name;
    }
  }
  // -------- ↑ functions for show profile ---------
  
  useEffect(() => {
    fetchProfile();
    console.log('sb',userNo);
    document.title = "More Info";
    return () => {
      document.title = 'HyruleCastle - Step into a world of hearts';
    };
  }, []);

  return (
    <div style={pageStyle}>
        <div style={ titleStyle }>
          <Typography.Title style={{ marginBottom: '0px' }}>{getUserTypeStr(profile.role) + "'"}Profile</Typography.Title>
        </div>
        <Divider />

        <div>
          <Typography.Title level={5}>Send your request:&nbsp; </Typography.Title> 
          <div>
            <Typography.Text>Comments:&nbsp; </Typography.Text> 
            <Input placeholder="Leave your comment here..." style={{ marginBottom: '20px' }}
              onChange={(e) => { setComment(e.target.value) }} />
          </div>
          <div>
            <Typography.Text>Select your items:&nbsp; </Typography.Text> 
            <Checkbox.Group options={donationStrList.map(item=>({label:item,value:targetReverseDict[item]}))} onChange={onCheckboxChange} />
          </div>
          <Button onClick={() => { sendRequest() }}  type="primary">Send</Button>
        </div>
        <Divider />

        <Descriptions title={ getProfileName() + "'s Information" }
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}   bordered>
            <Descriptions.Item label={profile.type == 1?'Charity Name':'Sponsor Name'}>{profile.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">{profile.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
            <Descriptions.Item label="Description">{profile.description}</Descriptions.Item>
            <Descriptions.Item label={getDescriptionDonationTitle(profile.role)}>
              {donationStrList.join(",")}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              {profile.image === null ?
               <span>This person is very mysterious, and there are no photos left behind.</span> :
               <Image alt='profile-image' width={200} 
                src={profile.image} />}
            </Descriptions.Item>
        </Descriptions>
    </div>
  )
}

export default MoreInfo;