import styled, { css } from 'styled-components';

const SliderChangeTrigger = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 9;
  bottom: 0;
  right: 0;
  background-color: black;
  border: none;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: background-color 0.3s linear;
  :hover {
    background-color: hsl(0, 0%, 27%);
  }
  ${(props) =>
    props.leftArrow &&
    css`
      right: 60px;
    `}
  @media only screen and (min-width: 600px) {
    width: 5.5vw;
    height: 5.5vw;
    left: 5.5vw;
    right: auto;

    ${(props) =>
      props.leftArrow &&
      css`
        left: 0;
      `}
  }
`;

export default SliderChangeTrigger;
