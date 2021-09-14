import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Become a Chef/i);
  expect(linkElement).toBeInTheDocument();
});
