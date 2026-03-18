const express = require('express');

function getInitialUsers() {
  return [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];
}

function createApp(initialUsers = getInitialUsers()) {
  const app = express();
  const users = [...initialUsers];

  app.use(express.json());

  app.get('/api/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/api/users/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id, 10);
    const user = users.find((entry) => entry.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  });

  app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }

    const newUser = {
      id: users.length + 1,
      name,
      email
    };

    users.push(newUser);
    return res.status(201).json(newUser);
  });

  return app;
}

module.exports = {
  createApp,
  getInitialUsers
};
