import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

// parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3006',
      'http://localhost:3000',
      'https://rehan-alamin-portfolio.netlify.app',
    ],
    credentials: true,
  }),
);
app.use(express.urlencoded());

// application routing
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Portfolio Project!');
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
