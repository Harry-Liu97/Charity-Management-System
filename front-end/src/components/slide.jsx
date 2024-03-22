import { Button, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./slide.module.scss";
import Rank from './SponsorRank'
/** Image rotation is realized by reference to the running lamp component, and automatic rotation is set by autoplay **/
export const Slide = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.carouselItemLogin} style={{ width: '1450px',  position: 'sticky' }}>
      <Carousel
        className={styles.carousel}
        dotPosition="top"
        // autoplaySpeed='100'
        autoplay
        dots={{ className: styles.dotclass }}
      >
          {/*Customize picture display, set picture path */}
        <div className={styles.carouselItem}>
          <img src={require("../assets/7.jpg")} alt="" srcset="" />
        </div>
        <div className={styles.carouselItem}>
          <img src={require("../assets/2.jpeg")} alt="" srcset="" />
        </div>
        <div className={styles.carouselItem}>
          <img src={require("../assets/5.png")} alt="" srcset="" />
        </div>
      </Carousel>
      <div className={styles.loginRight} style={{ height: '839px' }}>
        <Rank />
        <h2>Would you like join us</h2>
        <Button
          style={{ backgroundColor: "rgb(160, 218, 197)" }}
          onClick={() => navigate("/login")}
        >
          Login in
        </Button>
      </div>
    </div>
  );
};

export default Slide;