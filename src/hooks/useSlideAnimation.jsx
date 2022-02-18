import { useState } from 'react';
import { motion } from 'framer-motion';

function useSlideAnimation(props) {
  let [indexImage, setIndexImage] = useState({
    i: 0,
    previousIndex: null,
    didUserClickedNext: null,
    nextIndex: 1,
  });
  let exit,
    dataLength = props[0].data.length;
  const isTheCurrentlyImageTheLast = indexImage?.i === dataLength - 1;
  const isTheCurrentlyImageTheFirst = indexImage?.i === 0;

  let newIndexImageState;
  let goToPrevious = function () {
    newIndexImageState = { didUserClickedNext: false };
    motionDivComponents.map((motionDivComponent) => {
      motionDivComponent.props.exit.x = '100%';
      return motionDivComponent;
    });
    if (isTheCurrentlyImageTheFirst) {
      newIndexImageState.i = dataLength - 1;
      newIndexImageState.previousIndex = 0;
      newIndexImageState.nextIndex = dataLength - 2;
    } else {
      newIndexImageState.i = indexImage?.i - 1;
      newIndexImageState.previousIndex = indexImage?.i;
      let supposedIndexImage = indexImage?.i - 2;
      newIndexImageState.nextIndex =
        supposedIndexImage < 0 ? dataLength - 1 : supposedIndexImage;
    }
    setIndexImage(newIndexImageState);
  };
  let goToNext = function () {
    newIndexImageState = { didUserClickedNext: true };
    props = props.map((silderComponent) => {
      silderComponent.ChildComponent.didUserChangeDirection = '30%';
      return silderComponent;
    });
    motionDivComponents.map((motionDivComponent) => {
      motionDivComponent.props.exit.x = `-100%`;
      return motionDivComponent;
    });
    if (isTheCurrentlyImageTheLast) {
      newIndexImageState.i = 0;
      newIndexImageState.previousIndex = dataLength - 1;
      newIndexImageState.nextIndex = 1;
    } else {
      newIndexImageState.i = indexImage?.i + 1;
      newIndexImageState.previousIndex = indexImage?.i;
      let supposedIndexImage = indexImage?.i + 2;
      newIndexImageState.nextIndex =
        supposedIndexImage >= dataLength ? 0 : supposedIndexImage;
    }
    setIndexImage(newIndexImageState);
  };

  const isTheCurrentlyImageTheNext =
    indexImage?.i > (indexImage?.previousIndex || -1) ||
    (indexImage?.previousIndex === dataLength - 1 && indexImage?.i === 0);

  const isTheCurrentlyImageThePrevious =
    indexImage?.i < (indexImage?.previousIndex || dataLength) ||
    (indexImage?.previousIndex === 0 && indexImage?.i === dataLength - 1);
  if (isTheCurrentlyImageTheNext && indexImage?.didUserClickedNext) {
    exit = '-100%';
  } else if (
    isTheCurrentlyImageThePrevious &&
    !indexImage?.didUserClickedNext
  ) {
    exit = '100%';
  }
  const didComponentMountForTheFirstTime = indexImage?.previousIndex === null;
  let motionDivComponents = props.map(
    ({ data, className, ChildComponent, transitionProps }, j) => (
      <motion.div
        key={data[indexImage?.i].title || data[indexImage?.i]}
        className={className}
        initial={{
          zIndex: isTheCurrentlyImageThePrevious ? 9 : -1,
          opacity: didComponentMountForTheFirstTime ? 0 : 1,
          transition: {
            duration: transitionProps?.duration || 0.3,
          },
        }}
        animate={{
          x: 0,
          zIndex: -1,
          display: 'inline-block',
          opacity: 1,
          position: 'static',
          transition: {
            duration: transitionProps?.duration || 0.3,
          },
        }}
        exit={{
          zIndex: isTheCurrentlyImageTheNext ? -1 : 9,
          x: exit,
          transition: {
            duration: transitionProps?.duration || 0.3,
          },
        }}
      >
        <ChildComponent
          dataContent={data[indexImage?.i || '0']}
          nextDataContent={
            indexImage.didUserClickedNext === null
              ? data[indexImage?.nextIndex]
              : indexImage.didUserClickedNext
              ? data[indexImage?.nextIndex]
              : data[indexImage?.previousIndex]
          }
          didUserClickedNext={indexImage.didUserClickedNext}
          middleElements={props[j].middleElements || []}
          index={j}
          previousDataContent={
            indexImage.didUserClickedNext === null
              ? data[indexImage?.previousIndex] || data[dataLength - 1]
              : indexImage.didUserClickedNext
              ? data[indexImage?.previousIndex] || data[dataLength - 1]
              : data[indexImage?.nextIndex]
          }
        />
      </motion.div>
    )
  );
  return {
    motionDivComponents,
    goToPrevious,
    goToNext,
    indexImage,
  };
}

export default useSlideAnimation;
