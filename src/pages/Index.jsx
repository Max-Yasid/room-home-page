import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import LightBox from '../components/LightBox';
import iconHamburguer from '../assets/images/icon-hamburger.svg';
import Slider, { HookChildren } from '../components/Slider';
import './index.css';
import data from '../assets/data.json';
import PropTypes from 'prop-types';
import SliderChangeTrigger from '../styledComponents';
import iconLeft from '../assets/images/icon-angle-left.svg';
import iconRight from '../assets/images/icon-angle-right.svg';

import logo from '../assets/images/logo.svg';
import arrowIcon from '../assets/images/icon-arrow.svg';
import useSlideAnimation from '../hooks/useSlideAnimation';

function Index() {
  const isScreenMinWidth600 = window.matchMedia('(min-width: 600px)').matches;
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  let middleElements = [];
  const descriptionContainerRef = useRef(null);
  const sliderImages = isScreenMinWidth600
    ? [
        'desktop-image-hero-1.jpg',
        'desktop-image-hero-2.jpg',
        'desktop-image-hero-3.jpg',
      ]
    : [
        'mobile-image-hero-1.jpg',
        'mobile-image-hero-2.jpg',
        'mobile-image-hero-3.jpg',
      ];
  let { goToNext, goToPrevious, motionDivComponents } = useSlideAnimation([
    {
      data: data.imagesDescription,
      ChildComponent: HookChildrenDescription,
      className: 'index__descriptionMotionContainer',
      transitionProps: { duration: 0.3 },
      middleElements,
    },
    {
      data: sliderImages,
      ChildComponent: HookChildren,
      className: 'slider__imageContainer',
    },
  ]);
  function goToNextHandler() {
    middleElements[0].props.exit.x = '-30%';
    goToNext();
  }
  function goToPreviousHandler() {
    middleElements[0].props.exit.x = '30%';
    goToPrevious();
  }
  return (
    <main className="index">
      <AnimatePresence>
        {isLightBoxOpen && (
          <LightBox alignItems="flex-start">
            <Header closeLightBox={() => setIsLightBoxOpen(false)} />
          </LightBox>
        )}
      </AnimatePresence>

      {isScreenMinWidth600 ? (
        <Header />
      ) : (
        <header className="index__header">
          <img
            className="index__hambuger"
            src={iconHamburguer}
            alt="hamburger icon"
            onClick={() => setIsLightBoxOpen(true)}
            role="presentation"
          />
          <img src={logo} alt="logo" />
        </header>
      )}

      <Slider
        images={sliderImages}
        ChildrenComponent={motionDivComponents[1]}
        parentHandlers={{
          goToNextHandler: goToNextHandler,
          goToPreviousHandler: goToPreviousHandler,
        }}
      />
      <LayoutGroup>
        <section className="index__description" title="description slider">
          <div
            className="index__dynamicDescriptionPart"
            ref={descriptionContainerRef}
          >
            <AnimatePresence exitBeforeEnter>
              {motionDivComponents[0]}
            </AnimatePresence>
            <motion.div
              className="index_shopNowContainer"
              layout
              transition={{ duration: 0.3 }}
            >
              <button className="index_btnShop">
                SHOP NOW
                <img src={arrowIcon} alt="arrow" />
              </button>
            </motion.div>
          </div>
          {isScreenMinWidth600 && (
            <React.Fragment>
              <SliderChangeTrigger onClick={goToPreviousHandler} leftArrow>
                <img src={iconLeft} alt="left angle icon" />
              </SliderChangeTrigger>
              <SliderChangeTrigger onClick={goToNextHandler}>
                <img src={iconRight} alt="right angle icon" />
              </SliderChangeTrigger>
            </React.Fragment>
          )}
        </section>
        <StaticIndexContent isScreenMinWidth600={isScreenMinWidth600} />
      </LayoutGroup>
    </main>
  );
}

export function HookChildrenDescription({
  dataContent,
  nextDataContent,
  previousDataContent,
  didUserClickedNext,
  middleElements,
  index,
}) {
  middleElements[index] = (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      exit={{
        x: didUserClickedNext ? '-30%' : '30%',
      }}
      className="index__titleAndDescriptionContainer"
    >
      <h2 className="index__descriptionTitle" title="slider title">
        {dataContent.title}
      </h2>
      <p className="index__descriptionParagraph" title="slider description">
        {dataContent.description}
      </p>
    </motion.div>
  );
  return (
    <div className="index__HookChildrenDescription">
      <motion.div
        initial={{ x: '-30%' }}
        animate={{ x: '-30%' }}
        exit={{ x: 0 }}
        style={{ left: '-100%' }}
        transition={{ duration: 0.2 }}
        className="index__titleAndDescriptionContainer positionAbsolute positionAbsolute--left"
      >
        <h2 className="index__descriptionTitle">{previousDataContent.title}</h2>
        <p className="index__descriptionParagraph">
          {previousDataContent.description}
        </p>
      </motion.div>

      {middleElements[index]}

      <motion.div
        initial={{ x: '30%' }}
        animate={{ x: '30%' }}
        exit={{ x: 0 }}
        style={{ left: '100%' }}
        className="index__titleAndDescriptionContainer positionAbsolute"
      >
        <h2 className="index__descriptionTitle">{nextDataContent.title}</h2>
        <p className="index__descriptionParagraph">
          {nextDataContent.description}
        </p>
      </motion.div>
    </div>
  );
}

HookChildrenDescription.propTypes = {
  previousDataContent: PropTypes.objectOf(PropTypes.string),
  dataContent: PropTypes.objectOf(PropTypes.string),
  nextDataContent: PropTypes.objectOf(PropTypes.string),
  didUserClickedNext: PropTypes.bool,
  middleElements: PropTypes.array,
  index: PropTypes.number,
};

const StaticIndexContent = React.memo(({ isScreenMinWidth600 }) => {
  return (
    <>
      <motion.img
        layout
        className={`index__secondaryImage ${
          isScreenMinWidth600 && 'index__secondaryImage--margin0'
        }`}
        src={require('../assets/images/image-about-dark.jpg')}
        alt="living room"
      />
      <motion.section
        layout
        className="index__description index__description--padding"
      >
        <h2 className="index__fornitureTitle">ABOUT OUR FORNITURE</h2>
        <p className="index__descriptionParagraph">
          Our multifunctional collection blends design and function to suit your
          individual taste. Make each room unique, or pick a cohesive theme that
          best express your interests and what inspires you. Find the furniture
          pieces you need, from traditional to contemporary styles or anything
          in between. Product specialists are available to help you create your
          dream space.
        </p>
      </motion.section>
      <motion.img
        layout
        className="index__secondaryImage index__secondaryImage--margin0"
        src={require('../assets/images/image-about-light.jpg')}
        alt="forniture"
      />
    </>
  );
});

StaticIndexContent.defaultProps = {
  isScreenMinWidth600: window.matchMedia('(min-width: 600px)').matches,
};

StaticIndexContent.propTypes = {
  isScreenMinWidth600: PropTypes.bool,
};

StaticIndexContent.displayName = 'StaticIndexContent';
export default Index;
