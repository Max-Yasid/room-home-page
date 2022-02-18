import React from 'react';
import SliderChangeTrigger from '../styledComponents';
import './slider.css';
import iconLeft from '../assets/images/icon-angle-left.svg';
import iconRight from '../assets/images/icon-angle-right.svg';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

function Slider({ ChildrenComponent, parentHandlers }) {
  const screenSizeMediaQuery = window.matchMedia('(min-width: 600px)');
  return (
    <div className="slider" title="image-slider">
      <div className="slider__container">
        <AnimatePresence>{ChildrenComponent}</AnimatePresence>
      </div>
      {!screenSizeMediaQuery.matches && (
        <React.Fragment>
          <SliderChangeTrigger
            onClick={parentHandlers.goToPreviousHandler}
            leftArrow
          >
            <img src={iconLeft} alt="left angle icon" />
          </SliderChangeTrigger>
          <SliderChangeTrigger onClick={parentHandlers.goToNextHandler}>
            <img src={iconRight} alt="right angle icon" />
          </SliderChangeTrigger>
        </React.Fragment>
      )}
    </div>
  );
}

export function HookChildren({
  dataContent,
  nextDataContent,
  previousDataContent,
}) {
  return (
    <React.Fragment>
      <img
        style={{ left: '-100%' }}
        className="slider__image silder__previousOrNextImage"
        src={require(`./../assets/images/${previousDataContent}`)}
        alt="product"
      />
      <img
        className="slider__image"
        src={require(`./../assets/images/${dataContent}`)}
        alt="product"
      />
      <img
        style={{ left: '100%' }}
        className="slider__image silder__previousOrNextImage"
        src={require(`./../assets/images/${nextDataContent}`)}
        alt="product"
      />
    </React.Fragment>
  );
}
HookChildren.propTypes = {
  dataContent: PropTypes.string,
  nextDataContent: PropTypes.string,
  previousDataContent: PropTypes.string,
};
Slider.propTypes = {
  ChildrenComponent: PropTypes.element,
  parentHandlers: PropTypes.objectOf(PropTypes.func),
};

export default Slider;
