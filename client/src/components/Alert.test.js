import { render, screen } from '@testing-library/react';
import Alert from './Alert';

test('renders Success', () => {
  const msgOK = { type: 'Success', text: 'Saved successfully' };

  render(<Alert type={msgOK.type} text={msgOK.text} />);

  const pStatus = screen.getByText(msgOK.type);
  expect(pStatus).toBeInTheDocument();

  const pText = screen.getByText(msgOK.text);
  expect(pText).toBeInTheDocument();
});

test('renders Error', () => {
  const msgOK = { type: 'Error', text: 'Invalid link' };

  render(<Alert type={msgOK.type} text={msgOK.text} />);

  const pStatus = screen.getByText(msgOK.type);
  expect(pStatus).toBeInTheDocument();

  const pText = screen.getByText(msgOK.text);
  expect(pText).toBeInTheDocument();
});
