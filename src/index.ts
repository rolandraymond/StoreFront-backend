import express from 'express';
import conUsers, { create } from './controller/conUsers';
import routes from './controller/conorders';
import * as productroutes from './controller/conproducts';

// config server

const port = 3000;

const app = express();
app.use(express.json());

app.use('/', conUsers.routes);

app.post('/', (req, res) => {
  res.json({
    massaage: 'hallo world',
    data: req.body,
  });
});

conUsers.userindex(app);
conUsers.showuser(app);
conUsers.deleteByid(app);
conUsers.updatebyId(app);
conUsers.sgin_user(app);

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
// create orders http://localhost:3000/createorder
app.use('/', routes);

// create product http://localhost:3000/createorder/createproduct
productroutes.createproduct(app);

export default app;
