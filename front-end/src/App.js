import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import Home from './components/slide';
import Login from './components/login'
import Register from './components/register';
import RegisterSuccess from './components/registerSuccess';
import Profile from './components/profile';
import ProfileEdit from './components/profileEdit';
import ProfilePassword from './components/profilePassword';
import CharitiesPage from './components/charitiesPage';
import SponsorsPage from './components/sponsorsPage';
import MoreInfo from './components/MoreInfo';
import Request from './components/Request';
import Reward from './components/reward'
import RewardHistory from './components/rewardHistory'
import Statistic from './components/statistic';
import LogOutSuccess from './components/LogOutSuccess';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/RegisterSuccess' element={<RegisterSuccess />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/ProfileEdit' element={<ProfileEdit />} />
        <Route path='/ProfilePassword' element={<ProfilePassword />}/>
        <Route path='/CharitiesPage' element={<CharitiesPage/>} />
        <Route path='/SponsorsPage' element={<SponsorsPage/>} />
        <Route path='/MoreInfo' element={<MoreInfo />} />
        <Route path='/MoreInfo/:userno' element={<MoreInfo />} />
        <Route path='/Request' element={<Request />} />
        <Route path='/reward' element={<Reward />} />
        <Route path='/history' element={<RewardHistory />} />
        <Route path='/statistic' element={<Statistic />} />
        <Route path='/logout' element={<LogOutSuccess />} />
      </Routes>
    </Layout>
  </Router>

  );
}

export default App;
