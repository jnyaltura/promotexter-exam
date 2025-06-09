import express from 'express';
import itemRoutes from './routes/itemRoutes';
import phoneRoutes from './routes/phoneRoutes';

const app = express();
app.use(express.json());

app.use(itemRoutes);
app.use(phoneRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
