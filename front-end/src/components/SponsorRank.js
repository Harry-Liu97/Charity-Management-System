import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {List, Avatar, Typography, Divider, Skeleton} from 'antd';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
let userMap = {};
function SponsorRank () {
  const [rankList, setRankList] = useState([]);

  function fetchPointRank () {
    axios.get('http://localhost:8090/point/rank')
    .then((res) => {
      // console.log('home', res);
      if (res.status === 200 && res.data.code === 200) {
          const list = [];
          for(let item of res.data.data){
              const userInfo = userMap[item.no];
              list.push({...item, ...userInfo})
          }
        setRankList(list)
        console.log('hello' , list);
      }
    })
  }
  function fetchUserInfo () {
    axios.get('http://localhost:8090/info/list')
    .then((res) => {
        // console.log('home', res);
        if (res.status === 200 && res.data.code === 200) {
            let obj = {};
            for(let item of res.data.data){
                obj[item.no] = item;
            }
            userMap = obj;
        }
    })
  }
  const initDataFunc = async ()=>{
      await fetchUserInfo();
      await fetchPointRank();
  }
  useEffect(() => {
      initDataFunc();
      console.log(rankList)
  }, []);
  const map = {
      0: "#FFD700",
      1: "#C0C0C0",
      2: "#B87333"
  }
  return (
    <>
    <Typography.Title  level={2}>🏆&nbsp;Top Sponsors</Typography.Title>
     <div
      id="scrollableDiv"
      style={{
        height: 520,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
         <InfiniteScroll
        dataLength={rankList.length}
        // next={loadMoreData}
        hasMore={rankList.length < 6}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
            itemLayout="horizontal"
            dataSource={rankList}
            renderItem={(item, index) => (
                <List.Item style={{
                    borderRadius: 20,
                    marginTop: 10,
                    boxShadow:"0 2px 12px 0 rgba(0, 0, 0, 0.3)",
                    padding: 20,
                    background: map[index] }}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.image} />}
                        title={<Link to={`/MoreInfo/${item.no}`}>{item.name}</Link>}
                        description={`donated ${item.success} times, worth ${item.points} points`}
                    />
                </List.Item>
            )}
        />
      </InfiniteScroll>
    </div>
    </>
  )
}

export default SponsorRank;