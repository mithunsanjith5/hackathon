const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./user');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    // Register user if not exists
    user = new User({ email, password, loginCount: 1 });
    await user.save();
    return res.json({ message: 'User registered and logged in', loginCount: user.loginCount });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  user.loginCount += 1;
  await user.save();
  res.json({ message: 'Login successful', loginCount: user.loginCount });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
