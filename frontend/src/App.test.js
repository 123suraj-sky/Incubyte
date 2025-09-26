const { render, screen } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const App = require('./App').default;

test('renders login heading', () => {
  render(
    <MemoryRouter initialEntries={["/auth"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
