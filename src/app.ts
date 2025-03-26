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
    origin: '*',
  }),
);
// app.use(
//   cors({
//     origin: [
//       'https://rehan-alamin-portfolio.netlify.app',
//       'https://portfolio-admin-roan.vercel.app',
//     ],
//   }),
// );
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
