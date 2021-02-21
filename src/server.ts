import { Application } from 'express';

export default (api: Application) => {
  const PORT = process.env.PORT || 3000;

  const server = api.listen(PORT, () => {
    const { port }: any = server.address();
    console.log(`API server running at http://localhost:${port}`);
  });

  return server;
};
