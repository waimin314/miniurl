import { render } from '@testing-library/react';
import UrlForm from './UrlForm';

let component, form, textInput, submitBtn;

beforeEach(() => {
  component = render(<UrlForm />);
  form = component.container.querySelector('form');
  [textInput, submitBtn] = component.container.querySelectorAll('input');
});

test('renders form with input and button successfully', () => {
  expect(textInput.type).toBe('text');
  expect(submitBtn.type).toBe('submit');
  expect(submitBtn.value).toBe('Minify');
});

// Problem with promise not getting resolved. TO DO
// describe('when submit button is pressed', () => {
//   test('should show the new created miniurl for valid link', async () => {
//     fireEvent.change(textInput, {
//       target: { value: 'https://favicon.io/favicon-generator/' },
//     });
//     await fireEvent.submit(form);
//   });

//});
