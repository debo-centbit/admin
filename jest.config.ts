const jestConfig = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      isolatedModules: true,
    },
  },
};

export default jestConfig;
