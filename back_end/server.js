import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRouter.js';
import cors from 'cors';
//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/', (req, res) => {
  res.send('<h1>Welcome to a new journey.</h1>');
});

// PORT
const PORT = process.env.PORT || 3500;

//run and listen
app.listen(PORT, () => {
  console.log(
    `Server run on model ${process.env.DEV_MODE} on PORT: ${PORT}`.bgCyan.white
  );
});
