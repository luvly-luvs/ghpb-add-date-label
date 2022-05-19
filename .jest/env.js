const env = {
  GITHUB_REPOSITORY: 'mock/repo',
};

process.env = {
  ...process.env,
  ...env,
};
