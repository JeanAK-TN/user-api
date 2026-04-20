const { createApp } = require('./app');

const app = createApp();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

if (require.main === module) {
  const server = app.listen(port, host, () => {
    console.log(`User API listening on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  const shutdown = (signal) => {
    console.log(`${signal}: closing server`);
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => {
    shutdown('SIGTERM');
  });

  process.on('SIGINT', () => {
    shutdown('SIGINT');
  });
}

module.exports = app;
