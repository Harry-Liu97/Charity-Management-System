// import logo from '../assets/botw-heart.gif'
import { AppstoreOutlined, MailOutlined, SettingOutlined, HeartTwoTone, TrophyOutlined, QqOutlined} from '@ant-design/icons';
import { Button, Layout, Menu, message, theme } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrawerAppBar from './drawerAppBar';
import { Margin } from '@mui/icons-material';
const { Header, Content, Footer } = Layout;

const App = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [current, setCurrent] = useState('');
  const navigate = useNavigate();


  return (
    <Layout style={{  backgroundColor: 'rgb(255 255 255)', minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: 'rgb(26 118 210)'
        }}
      >
        <DrawerAppBar />
      </Header>
      <Content
        className="site-layout"
        style={{ width: '1450px', margin: '0 auto', flex: 1 }}
      >
        <div
          style={{
            padding: 15,
            minHeight: 380,
          }}
        >
          {props.children}
          
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Hyrule Castle - Charity
      </Footer>
    </Layout>
  );
};
export default App;

