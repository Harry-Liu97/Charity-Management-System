import React, { useEffect, useState, useRef  } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


// Status - '0': In Progress,   '1': Agree,  '2': Reject
// Target - 
        // '0': ' 🍔 Food',
        // '1': ' 🧣 Cloth',
        // '2': ' 💰 Money',
        // '3': ' 💞 Others'
function Statistic () {
    const cur_name = sessionStorage.getItem('id')
    const [process, setProcess] = useState([])
    const [success, setSuccess] = useState([])
    const [fail, setFail] = useState([])
    const [maxLimit, setMaxLimit] = useState(0)
    const [target, setTarget] = useState({
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0
    })
    const chartRefPie = useRef(null);
    const chartRefRadar = useRef(null);

    // collect relevant info from database
    useEffect(() => {
        axios.get('http://localhost:8090/message/list')
        .then(res => {
            setProcess([])
            setSuccess([])
            setFail([])
            const updatedTarget = {
                '0': 0,
                '1': 0,
                '2': 0,
                '3': 0
              };
            res.data.data.forEach(item => {
                if (item.sender === cur_name || item.receiver === cur_name) {
                    if (item.status === 0) {
                        setProcess((prevItem) => [
                                ...prevItem,
                                item
                            ])

                    } else if (item.status === 1) {
                        setSuccess((prevItem) => [
                            ...prevItem,
                            item
                        ])
                        // console.log(item.target)
                        updatedTarget[item.target] = (updatedTarget[item.target] || 0) + 1;
                    } else if (item.status === 2) {
                        setFail((prevItem) => [
                            ...prevItem,
                            item
                        ])
                    } 
                }
            })
            setTarget(updatedTarget);
            const maxValue = Math.max(...Object.values(updatedTarget));
            setMaxLimit(maxValue)
        })
    }, [cur_name])

    // data for pie chart
    const option_pie = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Donation Form',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 23,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: success.length, name: 'Success', itemStyle: {color: '#73c0de'} },
              { value: process.length, name: 'In progress', itemStyle: {color: '#fac858'} },
              { value: fail.length, name: 'Reject', itemStyle: {color: '#ee6666'} }
            ]
          }
        ]
    }

    // data for radar image
    const option_radar = {

        legend: {
          data: ['Target Distribution'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Money', max: maxLimit + 1, color: 'black' , label: { show: true }},
            { name: 'Food', max: maxLimit  + 1, color: 'black' , label: { show: true }},
            { name: 'Cloth', max: maxLimit + 1, color: 'black', label: { show: true }},
            { name: 'Others', max: maxLimit + 1, color: 'black', label: { show: true }},
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [target[2], target[0], target[1], target[3]],
                name: 'Target Distribution',
                label: { show: true, formatter: '{c}',                 
                    textStyle: {
                    color: '#ee6666', 
                    fontSize: 15 ,
                  } },

              },
            ],
          }
        ]
      };

    // generate pie chart
    useEffect(() => {
        if (chartRefPie.current) {

          const chartPie = echarts.init(chartRefPie.current);
          chartPie.setOption(option_pie);

          return () => {
            chartPie.dispose();
          };
        }
      }, [option_pie]);

      // generate radar
      useEffect(() => {
        if (chartRefRadar.current) {

          const chartRadar = echarts.init(chartRefRadar.current);
          chartRadar.setOption(option_radar);

          return () => {
            chartRadar.dispose();
          };
        }
      }, [option_radar]);

    return (
    <>
    <div style={{ width: 1450, height: 400, display: 'flex', justifyContent: 'center',  position: 'sticky' }}>
    <Typography variant="h6" color="text.first" style={{ paddingTop: '6px',  width: 1450, height: '50px', textAlign:'center' }}>
    {cur_name}'s Donation Pie Chart
    <Divider />
    <div ref={chartRefPie} style={{ width: 1450, height: '350px' }} />
    </Typography>
    </div>
    {/* <button onClick={() => {show()}}>show</button> */}

    {/* <div ref={chartRefRadar} style={{ width: 1450, height: '350px' }} /> */}
    <div style={{ width: 1450, height: 450, display: 'flex', justifyContent: 'center',  position: 'sticky' }}>
    <Typography variant="h6" color="text.first" style={{ paddingTop: '6px',  width: 1450, height: '50px', textAlign:'center' }}>
    {cur_name}'s Category Radar
    <Divider />
    <div ref={chartRefRadar} style={{ width: 1450, height: '400px', paddingTop: '8px' }} />
    </Typography>
    </div>
    {/* <button onClick={() => {show()}}>show</button> */}
    </>
  )
}

export default Statistic;