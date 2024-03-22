import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

function SponsorsPage () {
  const navigate = useNavigate();

  const [target, setTarget] = useState([]);
  const [name, setName] = useState('')
  const [content, setContent] = useState([])
  const [pageNum, setPageNum] = useState(0)
  const [page, setPage] = useState(1)
  const supply = {
    '0': ' 🍔 Food',
    '1': ' 🧣 Cloth',
    '2': ' 💰 Money',
    '3': ' 💞 Others'
  }

  const handleChange = (event) => {
    setTarget(event.target.value);
  };

  const changePageNum = (event, value) => {
    setPage(value)
  }

  // clear the search content and initialize
  function emptySearch() {
    setName('')
    setTarget([])

    let role = '0'
    if (sessionStorage.getItem('role') === '2') {
      role = '1'
    } else {
      role = '2'
    }
    axios.post("http://localhost:8090/info/pagingQuery", {
      'pageSize': '6',
      'pageNum': '1',
      'params': {
        'name': "",
        'role': role,
        'target': ""
      }
    })
    .then(res => {
      if (res.data.code === 200) {
        message.success('✨Initialize successfully')
        setContent(res.data.data)
        setPageNum(Math.floor(res.data.total / 6 + 1)) // calculate the page number
        setPage(1) // initialize
      }
    })
  }

  function search() {
    let role = '0'
    if (sessionStorage.getItem('role') === '2') {
      role = '1'
    } else {
      role = '2'
    }
    axios.post("http://localhost:8090/info/pagingQuery", {
      'pageSize': '6',
      'pageNum': '1',
      'params': {
        'name': name,
        'role': role,
        'target': target.join(',')
      }
    })
    .then(res => {
      if (res.data.code === 200) {
        message.success('✨Search successfully')
        setContent(res.data.data)
        setPageNum(Math.floor(res.data.total / 6 + 1))
        setPage(1)
      }
    })
  }
  
    // change the current sponsors info when page changed
    useEffect(() => {
      let role = '0'
      if (sessionStorage.getItem('role') === '2') {
        role = '1'
      } else {
        role = '2'
      }

      axios.post("http://localhost:8090/info/pagingQuery", {
      'pageSize': '6',
      'pageNum': page.toString(),
      'params': {
        'name': name,
        'role': role,
        'target': target.join(',')
      }
    })
    .then(res => {
      if (res.data.code === 200) {
        setContent(res.data.data)
        setPageNum(Math.floor(res.data.total / 6 + 1))
      }
    })
    }, [page])

  // render icon to the card
  function turnArray(str) {
    const cur_array = str.split(',')
    let show_icon = ''
    cur_array.map((item) => {
      show_icon = show_icon + supply[item]
    })
    return show_icon
  }

  return (
    <>
       {/* Search component */}
      <div style={{ width: 1450, height: 100, display: 'flex', justifyContent: 'center', position: 'sticky' }}>
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >
          <TextField id="name" label="name" variant="outlined" value={name}  onChange={(e) => setName(e.target.value)}/>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={target}
                label="type"
                onChange={handleChange}
              >
                <MenuItem value={'0'}>🍔 Food</MenuItem>
                <MenuItem value={'1'}>🧣 Clothes</MenuItem>
                <MenuItem value={'2'}>💰 Money</MenuItem>
                <MenuItem value={'3'}>💞 Others</MenuItem>
              </Select>
          </FormControl>

          <Button onClick={() => { search() }} variant="contained" startIcon={<SearchIcon />} style={{ width: '120px', height: '55px' }}>
            Search
          </Button>

          <Button onClick={() => { emptySearch() }}  variant="outlined" startIcon={<DeleteIcon />} style={{ width: '120px', height: '55px' }}>
            Clear
          </Button>

        </Box>
      </div>

        {/* Render charities info from database */}
      <div style={{ width: 1450, display: 'flex', flexWrap: 'wrap', gap: '39px', justifyContent: 'center' }}>
        {content.map((item) =>
        <div key={item.no} style={{ width: 350, height:330 }}>

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
                  <Typography variant="h7" color="text.first">
                    Phone: {item.phone} <br/>
                    <span>Email: {item.email}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ paddingTop: '6px' }}>
                    Supply I Donate:<br/>
                    <span>{turnArray(item.target)}</span>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => { navigate('/moreInfo/' + item.no) }}>More Info</Button>
                </CardActions>
              </Card>
          </div>
          )}

      </div>

    {/* Pagination component */}
      <div style={{ width: 1450, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2}>
      <Pagination count={pageNum} page={page} onChange={changePageNum} color="primary" />
    </Stack>
      </div>

  </>
  )
}


export default SponsorsPage;