import { motion } from 'framer-motion';
import React from 'react';
import propTypes from 'prop-types';
import './lightbox.css';

function LightBox({ alignItems, justifyContent, children }) {
  return (
    <motion.div
      className="lightbox"
      style={{ alignItems, justifyContent }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

LightBox.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
};

LightBox.propTypes = {
  alignItems: propTypes.string,
  justifyContent: propTypes.string,
  children: propTypes.element.isRequired,
};

export default LightBox;
