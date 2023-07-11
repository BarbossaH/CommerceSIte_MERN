import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
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
//a kind of log middleware
app.use(morgan('dev'));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

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
