// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock axios (ESM) to avoid Jest ESM transform issues in node_modules
jest.mock('axios', () => {
  const resolved = (data = {}) => Promise.resolve({ data });
  const instance = {
    interceptors: { request: { use: jest.fn() } },
    get: jest.fn(() => resolved({})),
    post: jest.fn(() => resolved({})),
    put: jest.fn(() => resolved({})),
    delete: jest.fn(() => resolved({}))
  };
  return { __esModule: true, default: { create: jest.fn(() => instance) } };
});
