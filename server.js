const { createApp } = require('./app');

const app = createApp();
const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`User API listening on port ${port}`);
  });
}

module.exports = app;
