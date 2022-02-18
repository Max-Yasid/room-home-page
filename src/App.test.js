import { render } from '@testing-library/react';
import App from './App';
import Index from './pages/Index';

describe('render Tests', () => {
  test('should Main page render', () => {
    render(<App />);
    const mainPage = render(<Index />);
    expect(mainPage.container).toBeInTheDocument();
  });
});
