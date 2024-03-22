import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { message } from 'antd';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate, useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

function Reward () {
  const [name, setName] = useState('')
  const [content, setContent] = useState([])
  const [pageNum, setPageNum] = useState(0)
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState({})
  const [num, setNum] = useState('0')
  const [myPoint, setMyPoint] = useState('0')
  const [open, setOpen] = useState(false);
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const navigate = useNavigate()
  const handleClickOpen = (item) => {
    setOpen(true);
    // console.log(item)
    setInfo({
      id: item.id,
      name: item.name,
      point: item.point,
      store: item.store
    })
    setNum('0')
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  function search() {
    axios.post("http://localhost:8090/reward/pagingQuery", {
      'pageSize': '6',
      'pageNum': page.toString(),
      'params': {
        'name': name
      }
    })
    .then(res => {
      message.success('✨Search successfully')
      setContent(res.data.data)
      setPageNum(Math.floor(res.data.total / 6 + 1))
      setPage(1)
      console.log(res.data.data)
    })
  }

  // clear the search content and initialize
  function emptySearch() {
    setName('')
    axios.post("http://localhost:8090/reward/pagingQuery", {
      'pageSize': '6',
      'pageNum': '1',
      'params': {
        'name': ''
      }
    })
    .then(res => {
      message.success('✨Initialize successfully')
      setContent(res.data.data)
      setPageNum(Math.floor(res.data.total / 6 + 1)) // calculate the page number
      setPage(1) // initialize
    })
  }

  function update() {
    if (parseInt(num) === 0) {
      message.info('You did not exchange anything')
    } else {
      // update current user's record
      axios.post("http://localhost:8090/record/add", {
        "no": sessionStorage.getItem('id'),
        "prize": info.name,
        "count": parseInt(num),
        "time": `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
      })

      // update current user's point
      axios.post("http://localhost:8090/point/update", {
        "id": sessionStorage.getItem('idPoint'),
        "no": sessionStorage.getItem('id'),
        "points": parseInt(myPoint) - parseInt(num) * info.point
      })

      // update current reward's status
      axios.post("http://localhost:8090/reward/update", {
        "id": info.id,
        "store": info.store - parseInt(num)
      })
      
      message.success('You reward(s) has been exchanged successfully')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    
    }
  }

  // check whether your number fit the current condition - stock & point
  function checkNum() {
    if (parseInt(num) < 0) {
      message.error('You could not enter the amount less than 0')
      setNum('0')
    }
    if (parseInt(num) * parseInt(info.point) > parseInt(myPoint)) {
      message.warning('You could not exceed the amount of your current points')
      setNum('0')
    }
    if (parseInt(num) > parseInt(info.store)) {
      message.warning('Your reward\'s quantity is more than storage')
      setNum('0')
    }
  }

  const changePageNum = (event, value) => {
    setPage(value)
  }

  // change the current rewards info when page changed
  useEffect(() => {

    axios.post("http://localhost:8090/reward/pagingQuery", {
      'pageSize': '6',
      'pageNum': page.toString(),
      'params': {
        'name': name
      }
    })
    .then(res => {
      console.log(res.data.data)
      setContent(res.data.data)
      setPageNum(Math.floor(res.data.total / 6 + 1))
    })
  }, [page])

  // update your point saved in database
  useEffect(() => {

    axios.get(`http://localhost:8090/point/findByNo?no=${sessionStorage.getItem('id')}`)
    .then(res => {
        // console.log(typeof res.data.data.points)
        sessionStorage.setItem('idPoint', res.data.data.id)
        setMyPoint(res.data.data.points.toString())
    })
  }, [])

  return (
    <>
        <div style={{ width: 1450, height: 100, display: 'flex', justifyContent: 'center', position: 'sticky' }}>

          {/* Search component */}
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >
          <TextField id="name" label="name" variant="outlined" value={name}  onChange={(e) => setName(e.target.value)}/>

          <Button onClick={() => {search()}} variant="contained" startIcon={<SearchIcon />} style={{ width: '120px', height: '55px' }}>
            Search
          </Button>

          <Button onClick={() => {emptySearch()}}  variant="outlined" startIcon={<DeleteIcon />} style={{ width: '120px', height: '55px' }}>
            Clear
          </Button>

          <Fab variant="extended" style={{ width: '180px' }} onClick={() => {navigate('/history')}}>
            <NavigationIcon sx={{ mr: 1 }} onClick={() => {navigate('/history')}} />
            History
          </Fab>

        </Box>

      </div>

      {/* display rewards' info in the card */}
      <div style={{ width: 1450, display: 'flex', flexWrap: 'wrap', gap: '39px', justifyContent: 'center' }}>
        {content.map((item) =>
        <div key={item.id} style={{ width: 350, height:330 }}>

          <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.image}
                  title="green iguana"
                />
                <CardContent style={{ paddingBottom: '0px' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Point: {item.point} <br/>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{ paddingTop: '6px' }}>
                    Stock: {item.store}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {handleClickOpen(item)}} >Exchange</Button>
                </CardActions>
              </Card>
          </div>
          )}

      </div>

      {/* pagination component */}
      <div style={{ width: 1450, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2}>
      <Pagination count={pageNum} page={page} onChange={changePageNum} color="primary" />
    </Stack>
      </div>
      
      {/* Modal component */}
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Would you like to exchange {info.name} ?     
        </DialogTitle>

        <DialogContent style={{ textAlign:'center' }} dividers>
          
          <DialogContentText id="alert-dialog-description">

            {/* Live update according the operations you did */}
            <span style={{ fontSize: '18px' }}> Your point: {parseInt(myPoint) - parseInt(num) * info.point}</span> 
            <span style={{ paddingLeft: '15px', fontSize: '18px' }}> Storage: {info.store - parseInt(num)}</span>
            <span style={{ paddingLeft: '15px', fontSize: '18px' }}>Point: {info.point}</span>
            <Typography gutterBottom variant="h6" style={{ paddingTop: '9px' }}>
                    Total Points: {parseInt(num) * info.point}
            </Typography>
          </DialogContentText>

            <TextField
          id="outlined-number"
          label="Number"
          variant="filled"
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          onBlur={() => {checkNum()}}
          fullWidth
          required
          />


        </DialogContent> 

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" startIcon={<CloseIcon />} >Close</Button>
          <Button onClick={() => {handleClose(); update()}} autoFocus variant="contained" startIcon={<CheckIcon />}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </div>

    </>
  )
}

export default Reward;