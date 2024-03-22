import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function RewardHistory () {
    const navigate = useNavigate()
    const [content, setContent] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [page, setPage] = useState(1)
    const [myInfo, setMyInfo] = useState([])
    const [rows, setRows] = useState([])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const changePageNum = (event, value) => {
        setPage(value)
      }

    useEffect(() => {
        axios.get(`http://localhost:8090/point/findByNo?no=${sessionStorage.getItem('id')}`)
    .then(res => {
        setMyInfo(res.data.data)
        // console.log(res.data.data)
    })
    }, [])

    // change the current records info when page changed
    useEffect(() => {
        axios.post("http://localhost:8090/record/pagingQuery", {
          'pageSize': '11',
          'pageNum': page.toString(),
          'params': {
            'no': sessionStorage.getItem('id')
          }
        })
        .then(res => {
        //   console.log(res.data.data)
          setContent(res.data.data)
          setPageNum(Math.floor(res.data.total / 11 + 1))
        })
      }, [page])

      // create table's data
      useEffect(() => {
          setRows([])
          content.forEach((item, index) => {
            const cur_num = index + 1
            // console.log(cur_num)
            setRows((prevRow) => 
            [
                ...prevRow,
                createData(cur_num, item.prize, item.count, item.time),
            ])
      })
    }, [content])

    function createData(ID, name, count, time) {
        return { ID, name, count, time };
    }

return (
    <>  

        <div style={{ width: 1450, height: 100, display: 'flex',  alignItems: 'center', position: 'sticky' }}>

            {/* component shows your current successful donation quantity and your point */}
            <div style={{ marginLeft: '50px' }}>
            <Typography gutterBottom variant="h5" component="div">
            {myInfo.no}'s Reward History
            </Typography>
            </div>

            <div style={{ marginLeft: '190px' }} >
            <Typography gutterBottom variant="h6" color="text.secondary">
            Success Donate: {myInfo.success}
            </Typography>
            </div>

            <div style={{ marginLeft: '190px' }}>
            <Typography gutterBottom variant="h6" color="text.secondary">
            Your Point: {myInfo.points}
            </Typography>
            </div>

            <div style={{ marginLeft: '190px' }}>
            <Button variant="contained" onClick={() => {navigate('/reward')}} endIcon={<ArrowBackIcon />}>
        Back
      </Button>
            </div>

        </div>
        <Divider />

        {/* Table component - render all record of you from database */}
        <div style={{ marginTop: '30px', marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} sx={{ width: '1300px' }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell component="th" scope="row">
                {row.ID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.count}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>

    {/* pagination component */}
    <div style={{ width: 1450, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2}>
      <Pagination count={pageNum} page={page} onChange={changePageNum} color="primary" />
        </Stack>
      </div>
    </>
  )
}

export default RewardHistory;