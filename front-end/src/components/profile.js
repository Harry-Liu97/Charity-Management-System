import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Descriptions, Input, InputNumber, Form, Button, Typography, Divider, Avatar, Select, message, Image } from 'antd';
import { textAlign } from '@mui/system';
const { Option } = Select;

const localURL = 'http://localhost:8090/';
const pageStyle = {
  width: '80%',
  margin: 'auto'
}

const titleStyle = {
  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'
}

const backTarget = [
  {'id': 1, 'code': '0', 'type': 'food', 'remark': ''},
  {'id': 2, 'code': '1', 'type': 'cloth', 'remark': ''},
  {'id': 3, 'code': '2', 'type': 'money', 'remark': ''},
  {'id': 4, 'code': '3', 'type': 'others', 'remark': ''}
]

function Profile () {
  const [profile, setProfile] = useState({});

  const [page, setPage] = useState('view');

  const [targetList, setTargetList] = useState([]); // all donation(target) types in backend
  // const [donationNumList, setDonationNumList] = useState([]); // donations types for this user i.e['0', '1']
  const [donationStrList, setDonationStrList] = useState([]); // donations types for this user i.e['food', 'cloth']
  const role = sessionStorage.getItem('role');
  const id = sessionStorage.getItem('id');

  const navigate = useNavigate();

  // get this user's profile
  function fetchProfile () {
    axios.get(localURL + 'info/findByNo?no=' + id)
    .then(res => {
      if (res.status === 200) {
        console.log('Profile - fetch Profile: ', res.data);
        setProfile(res.data.data);
        // console.log('Profile - target string', res.data.data.target.split(','));
        let dStrList = []
        for (let i of res.data.data.target.split(',')) {
          if (i === '0') {
            dStrList.push('food');
          } else if (i === '1') {
            dStrList.push('cloth');
          } else if (i === '2') {
            dStrList.push('money');
          } else if (i === '3') {
            dStrList.push('others');
          }
        }
        setDonationStrList(dStrList);
      } else {
        alert('😵‍💫 fetchProfile Failed');
      }
    })
  }

  // get current all donation types in backend
  function fetchDonationTypes () {
    axios.get('http://localhost:8090/target/list')
    .then((res) => {
      if (res.status === 200) {
        // console.log('fetch target in database:', res.data.data);
        setTargetList(res.data.data);
      } else {
        alert('😵‍💫 fetchDonationType Failed');
      }
    })
  }

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
  // get profile name
  function getProfileName () {
    if (profile.name === '') { // if profile'name is empty, then show profile'no
      return profile.no;
    } else {
      return profile.name;
    }
  }

  useEffect(() => {
    // fetchDonationTypes();
    fetchProfile();
    document.title = "Profile - HyruleCastle";
    return () => {
      document.title = 'HyruleCastle - Step into a world of hearts';
    };
  }, []);

  function renderDescriptionTitle() {
    return (
      <div style={{ display: "flex", justifyContent: 'space-between'}}>
        <div><b>{getProfileName()}</b>'s Information</div>
        <div>
          <Button type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => { navigate('/ProfileEdit') }}
            >
            Edit</Button> 
          <Button danger
          onClick={() => { navigate('/ProfilePassword') }}>
            Change Password</Button>
        </div>
      </div>
    )
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={pageStyle}>
        <div style={ titleStyle }>
          <Typography.Title style={{ marginBottom: '0px' }}>Profile</Typography.Title>
          <div>
            <Button type="primary"
              style={{ marginRight: '10px' }}
              onClick={() => { navigate('/ProfileEdit') }} >
              Edit</Button> 
            <Button danger
            onClick={() => { navigate('/ProfilePassword') }} >
              Change Password</Button>
          </div>

        </div>
        <Divider />

        <Descriptions title={ getProfileName() + "'s Information" }
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}  bordered>
            <Descriptions.Item label={profile.type == 1?'Charity Name':'Sponsor Name'}>{profile.name}</Descriptions.Item>
            <Descriptions.Item label="User type">{getUserTypeStr(role)}</Descriptions.Item>
            <Descriptions.Item label="Phone">{profile.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
            <Descriptions.Item label="Description">{profile.description}</Descriptions.Item>
            <Descriptions.Item label={getDescriptionDonationTitle(role)}>
              {donationStrList.map((s, i) => (
                
                <span key={'d'+i} >{s} {console.log(s)}&nbsp;</span>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              {profile.image === null  || profile.image === '' ?
               <span>Set your image by <Link to="/ProfileEdit">edit profile</Link></span> :
               <Image alt='profile-image' width={200} 
                src={profile.image} />}
            </Descriptions.Item>
        </Descriptions>
    </div>
  );
}



export default Profile;