import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import styles from './styles/Home.module.css'
import SliderContent from "../../components/Home/Slider/SliderContent";
import sliderImage from "../../components/Home/Slider/sliderImage";
import InfoShop from '../../components/Home/InfoShop/InfoShop'
import { useSelector, useDispatch } from 'react-redux';

const len = sliderImage.length - 1;

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);


  }, []);




  return (

    <div className={styles.HomePage}>

      <NavBar />
      <div >
        <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} prevSlide={() =>
          setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
        }
          nextSlide={() =>
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
          } />

      </div>


      <InfoShop />

    </div>

  )
}

export default Home;