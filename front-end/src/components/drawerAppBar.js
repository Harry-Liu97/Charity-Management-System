import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';  // heart
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';  // heart hand
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';  // trophy
import MailOutlineIcon from '@mui/icons-material/MailOutline';  // message
import PetsIcon from '@mui/icons-material/Pets';  // whatever

const drawerWidth = 240;
// const itemsForDefault = ['HyruleCastle', 'TopSponsors', 'AboutUs'];
// const itemsForCharity = ['HyruleCastle', 'FindSponsors', 'TopSponsors', 'AboutUs'];
// const itemsForSponsor = ['HyruleCastle', 'FindCharties', 'TopSponsors', 'AboutUs'];
// const itemsForRoot = ['HyruleCastle', 'FindSponsors', 'FindCharties', 'TopSponsors', 'AboutUs'];
// const itemsLogedin = ['Profile', 'LogOut'];
// const itemsNotLogin = ['LogIn', 'Register'];

const itemsForDefault = [
  {
    label: 'Hyrule Castle',
    icon:  <FavoriteBorderIcon />,
    key: 'home'
    }
    // ,
    // {
    //   label: 'About Us',
    //   key: 'about-us',
    //   icon: <PetsIcon />
    // }
]
const itemsForCharity = [
  {
    label: 'Hyrule Castle',
    icon:  <FavoriteBorderIcon />,
    key: 'home'
    },
    {
      label: 'Find Sponsors',
      key: 'sponsorspage',
      icon: <VolunteerActivismIcon />,
    },
    {
      label: 'Request',
      key: 'request',
      icon: <MailOutlineIcon />
    },
    {
      label: 'Statistic',
      key: 'statistic'
    }
    // ,
    // {
    //   label: 'About Us',
    //   key: 'about-us',
    //   icon: <PetsIcon />
    // }
]
const itemsForSponsor = [
  {
    label: 'Hyrule Castle',
    icon:  <FavoriteBorderIcon />,
    key: 'home'
    },
    {
      label: 'Find Charties',
      key: 'charitiespage',
      icon: <VolunteerActivismIcon />,
    },
    {
      label: 'Request',
      key: 'request',
      icon: <MailOutlineIcon />
    },
    {
      label: 'Reward',
      key: 'reward'
    },
    {
      label: 'History',
      key: 'history'
    },
    {
      label: 'Statistic',
      key: 'statistic'
    }
    // ,
    // {
    //   label: 'About Us',
    //   key: 'about-us',
    //   icon: <PetsIcon />
    // }
]
const itemsForRoot = [
  {
    label: 'Hyrule Castle',
    icon:  <FavoriteBorderIcon />,
    key: 'homeicon'
    },
    {
      label: 'Find Charties',
      key: 'charities',
      icon: <VolunteerActivismIcon />,
    },
    {
      label: 'Top Sponsors',
      key: 'top-sponsors',
      icon: <EmojiEventsIcon /> 
    },
    {
      label: 'Request',
      key: 'request',
      icon: <MailOutlineIcon />
    },
    {
      label: 'Reward',
      key: 'reward'
    },
    {
      label: 'History',
      key: 'history'
    },
    {
      label: 'Statistic',
      key: 'statistic'
    }
    // ,
    // {
    //   label: 'About Us',
    //   key: 'about-us',
    //   icon: <PetsIcon />
    // }
]
const itemsLogedin = [
  {
    label: 'Profile',
    key: 'profile'
  },
  {
    label: 'LogOut',
    key: 'logout'
  }
]
const itemsNotLogin = [
  {
    label: 'Log In',
    key: 'login'
  },
  {
    label: 'Register',
    key: 'register'
  }
]

const itemDrawerNotLogin = [
  {
  label: 'Hyrule Castle',
  icon:  <FavoriteBorderIcon />,
  key: 'home'
  },
  {
    label: 'Log In',
    key: 'login'
  },
  {
    label: 'Register',
    key: 'register'
  }
]
const itemDrawerRoot = [
  {
    label: 'Hyrule Castle',
    key: 'home'
  },
  {
    label: 'Find Sponsors',
    key: 'sponsorspage'
  },
  {
    label: 'Find Charties',
    key: 'charitiespage'
  }
  ,
  {
    label: 'Request',
    key: 'request'
  }
  ,
  {
    label: 'Profile',
    key: 'profile'
  }
  ,
  {
    label: 'LogOut',
    key: 'logout'
  },
  {
    label: 'Reward',
    key: 'reward'
  },
  {
    label: 'History',
    key: 'history'
  },
  {
    label: 'Statistic',
    key: 'statistic'
  }
]
const itemDrawerCharity = [
  {
  label: 'Hyrule Castle',
  key: 'home'
  },
  {
    label: 'Find Sponsors',
    key: 'sponsorspage'
  },
  {
    label: 'Request',
    key: 'request'
  },
  {
    label: 'Statistic',
    key: 'statistic'
  },
  {
    label: 'Profile',
    key: 'profile'
  }
  ,
  {
    label: 'LogOut',
    key: 'logout'
  }
]
const itemDrawerSponsor = [  
  {
    label: 'Hyrule Castle',
    key: 'home'
  },
  {
    label: 'Find Charties',
    key: 'charitiespage'
  },
  {
    label: 'Request',
    key: 'request'
  },
  {
    label: 'Reward',
    key: 'reward'
  },
  {
    label: 'History',
    key: 'history'
  },
  {
    label: 'Statistic',
    key: 'statistic'
  },
  {
    label: 'Profile',
    key: 'profile'
  }
  ,
  {
    label: 'LogOut',
    key: 'logout'
  }
]

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const navigate = useNavigate();

  // drawer for mobile screen
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // dialog for confirm log out
  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  }

  // click yes in log out dialog
  const clickLogOut = () => {
    handleDialog();
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    navigate('/logout');
  }

  // default Nav-bar Items (Not Login)
  let itemsLeft = itemsForDefault;
  let itemsRight = itemsNotLogin;
  let itemsDrawer = itemDrawerNotLogin;

  // Login successfully
  if (sessionStorage.getItem('id')) { 
    itemsRight = itemsLogedin;
    // 1: charity, 2: sponsor, 0: root
    if (sessionStorage.getItem('role') === '1') { // charity
      itemsLeft = itemsForCharity;
      itemsDrawer = itemDrawerCharity;
    } else if (sessionStorage.getItem('role') === '2') { // sponsor
      itemsLeft = itemsForSponsor;
      itemsDrawer = itemDrawerSponsor;
    } else if (sessionStorage.getItem('root') === '0') { // root
      itemsLeft = itemsForRoot;
      itemsDrawer = itemDrawerRoot;
    }
  }

  // click on buttons on nav bar
  const handleClickItems = (key) => {
    if (key === 'logout') {
      handleDialog();
    } else {
      navigate(`/${key}`);
    }
  }

  // drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        HyruleCastle
      </Typography>
      <Divider />
      <List>
        {itemsDrawer.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText 
                primary={item.label}
                onClick={() => { handleClickItems(item.key) }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* desktop nav bar */}
          <Box style={{ display: 'flex', justifyContent: 'space-between', width:"100%" }}>
            <Box sx={{ display: { xs: 'none', sm: 'inline-block', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' } }}>
              {itemsLeft.map((item) => (
                <Button key={item.key}
                  onClick={() => { handleClickItems(item.key) }}
                  sx={{ color: '#fff', textTransform: "none" }}>
                  {item.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'inline-block', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' } }}>
              {itemsRight.map((item) => (
                <Button key={item.key} sx={{ color: '#fff', textTransform: 'none' }}
                  onClick={() => { handleClickItems(item.key) }}>
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* mobile drawer nav */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      {/* dialog for confirm log out */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialog}>
        <DialogTitle>Log Out</DialogTitle>
        <DialogContent>Are you sure to log out?</DialogContent>
        <DialogActions>
          <Button onClick={() => { clickLogOut() }}>Yes</Button>
          <Button onClick={handleDialog}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DrawerAppBar;
