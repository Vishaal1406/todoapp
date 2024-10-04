const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes'); // Removed dotenv import

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

// Hardcode the port to 5000
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
