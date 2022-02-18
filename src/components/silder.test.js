import { render, screen, prettyDOM } from '@testing-library/react';
import Slider from './Slider';

let component;
const sliderImagesDesktop = [
  'desktop-image-hero-1.jpg',
  'desktop-image-hero-2.jpg',
  'desktop-image-hero-3.jpg',
];
const sliderImagesMobile = [
  'mobile-image-hero-1.jpg',
  'mobile-image-hero-2.jpg',
  'mobile-image-hero-3.jpg',
];

let mockFunction = jest.fn();

describe('render tests', () => {
  beforeEach(() => {
    const sliderImage = (
      <img
        className="slider__image"
        src={require(`./../assets/images/${sliderImagesDesktop[0]}`)}
        alt="product"
      />
    );
    component = render(<Slider ChildrenComponent={sliderImage} />);
  });
  afterEach(() => {
    component.unmount();
  });
  test('toggle arrow should not render on desktops screens', () => {
    const sliderLeftToggler = screen.queryByRole('button', {
      name: 'left angle icon',
    });
    const sliderRightToggler = screen.queryByRole('button', {
      name: 'right angle icon',
    });
    expect(sliderLeftToggler).toBeNull();
    expect(sliderRightToggler).toBeNull();
  });
  test('image element passed as prop should render', () => {});
});

describe('mobile screen tests', () => {
  beforeEach(() => {
    window.matchMedia = (query) => ({
      media: query,
      matches: false,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
    const sliderImage = (
      <img
        className="slider__image"
        src={require(`./../assets/images/${sliderImagesMobile[0]}`)}
        alt="product"
      />
    );
    component = render(
      <Slider
        parentHandlers={{
          goToPreviousHandler: mockFunction,
          goToNextHandler: mockFunction,
        }}
        ChildrenComponent={sliderImage}
      />
    );
  });
  afterEach(() => {
    component.unmount();
  });
  test('toggle arrow should render on mobile screens', () => {
    const sliderLeftToggler = screen.queryByRole('button', {
      name: 'left angle icon',
    });
    const sliderRightToggler = screen.queryByRole('button', {
      name: 'right angle icon',
    });
    expect(sliderLeftToggler).not.toBeNull();
    expect(sliderRightToggler).not.toBeNull();
  });
});
