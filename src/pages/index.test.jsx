import { waitFor, render, screen } from '@testing-library/react';
import Index from './Index';
import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
import data from './../assets/data.json';
import SliderChangeTrigger from '../styledComponents';
import iconLeft from '../assets/images/icon-angle-left.svg';
import iconRight from '../assets/images/icon-angle-right.svg';

let component;
const mockFunction = jest.fn();

describe('Render Tests', () => {
  beforeEach(() => (component = render(<Index />)));
  afterEach(() => component.unmount());
  test('header should render', () => {
    const header = render(<Header />);
    expect(header.container).toBeInTheDocument();
  });
  test('images slider should render', () => {
    const imageSlider = screen.getByTitle('image-slider');
    expect(imageSlider).toBeInTheDocument();
  });
  test('descriptions slider should render', () => {
    const descriptionSlider = screen.getByTitle('description slider');

    const firstDescriptionTitle = screen.getByTitle('slider title');
    const firstImageDescription = screen.getByTitle('slider description');
    expect(firstDescriptionTitle).toHaveTextContent(
      data.imagesDescription[0].title
    );
    expect(firstImageDescription).toHaveTextContent(
      data.imagesDescription[0].description
    );
    expect(descriptionSlider).toBeInTheDocument();
  });
  test('should second description render', () => {
    const descriptionTitle = screen.getByText(/ABOUT OUR FORNITURE/i);
    const description = screen.getByText(
      /best express your interests and what inspires you. Find the furniture/i
    );
    expect(description).toBeInTheDocument();
    expect(descriptionTitle).toBeInTheDocument();
  });
});
describe('render tests on mobile screen size', () => {
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

    component = render(<Index />);
    return component;
  });
  test('sliderTogglers should not render inside description container', () => {
    const imageSlider = screen.getByTitle('image-slider');
    const {
      container: { firstChild: sliderLeftToggler },
    } = render(
      <SliderChangeTrigger onClick={mockFunction} leftArrow>
        <img src={iconLeft} alt="left angle icon" />
      </SliderChangeTrigger>
    );
    const {
      container: { firstChild: sliderRightToggler },
    } = render(
      <SliderChangeTrigger onClick={mockFunction}>
        <img src={iconRight} alt="right angle icon" />
      </SliderChangeTrigger>
    );
    expect(imageSlider).not.toContainElement(sliderLeftToggler);
    expect(imageSlider).not.toContainElement(sliderRightToggler);
  });
});

describe('slider changes tests', () => {
  beforeEach(() => (component = render(<Index />)));
  afterEach(() => component.unmount());
  async function checkIfSliderDataHaveChanged(elementToggler, newExpectedData) {
    userEvent.click(elementToggler);
    await waitFor(
      async () => {
        const secondDescriptionTitle = screen.getByTitle('slider title');
        expect(secondDescriptionTitle).toHaveTextContent(newExpectedData.title);
      },
      { timeout: 600 }
    );
    await waitFor(() => {
      const secondImageDescription = screen.getByTitle('slider description');
      expect(secondImageDescription).toHaveTextContent(
        newExpectedData.description
      );
    });
  }

  test('should description change to the next when click next slider toggler', async () => {
    const rightToggler = screen.getByRole('button', {
      name: 'right angle icon',
    });
    await waitFor(() =>
      checkIfSliderDataHaveChanged(rightToggler, {
        title: data.imagesDescription[1].title,
        description: data.imagesDescription[1].description,
      })
    );
  });

  test('should description change to the previous when click previous slider toggler', async () => {
    const leftToggler = screen.getByRole('button', {
      name: 'left angle icon',
    });
    const imagesDescriptionData = data.imagesDescription;
    await waitFor(() =>
      checkIfSliderDataHaveChanged(leftToggler, {
        title: imagesDescriptionData[imagesDescriptionData.length - 1].title,
        description:
          imagesDescriptionData[imagesDescriptionData.length - 1].description,
      })
    );
  });
});

describe('testing slider toggle functions', () => {
  beforeEach(() => (component = render(<Index />)));
  test('change to previous description', () => {
    let {
      container: { firstChild: leftToggler },
    } = render(
      <SliderChangeTrigger onClick={mockFunction} leftArrow>
        <img src={iconLeft} alt="left angle icon" />
      </SliderChangeTrigger>
    );
    userEvent.click(leftToggler);
    expect(mockFunction).toBeCalledTimes(1);
    userEvent.click(leftToggler);
    expect(mockFunction).toBeCalledTimes(2);
  });
  test('change to next description', () => {
    let { container: rightToggler } = render(
      <SliderChangeTrigger onClick={mockFunction}>
        <img src={iconRight} alt="right angle icon" />
      </SliderChangeTrigger>
    );
    expect(rightToggler.firstChild).toBeInTheDocument();
    userEvent.click(rightToggler.firstChild);
    expect(mockFunction).toHaveBeenCalledTimes(1);
    userEvent.click(rightToggler.firstChild);
    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
