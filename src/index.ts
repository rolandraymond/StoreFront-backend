import express from 'express';
import conUsers from './controller/conUsers';
import * as orderroutes from './controller/conorders';
import * as productroutes from './controller/conproducts';
import * as OrdersProductsroutes from './controller/conOrdersProducts'
// config server

const port = 3000;

const app = express();
app.use(express.json());
//  http://localhost:3000/createUsers  user diffrant way to create user
app.use('/', conUsers.routes);

app.post('/', (req, res) => {
  res.json({
    massaage: 'hallo world',
    data: req.body,
  });
});
// http://localhost:3000/allusers
conUsers.userindex(app);

// http://localhost:3000/getuserByid/:id
conUsers.showuser(app);

// http://localhost:3000/deleteUserByid/:id
conUsers.deleteByid(app);

//http://localhost:3000/updateuser
conUsers.updatebyId(app);

//  http://localhost:3000/signin
conUsers.sgin_user(app);


/*     ------------------------------------   products routes ----------------------------------  */


// create product http://localhost:3000/createproduct
productroutes.createproduct(app);

// get all products  http://localhost:3000/allproducts
productroutes.prodcutindex(app)

// get specifically by name  http://localhost:3000/getproductByname/:name 
productroutes.showproduct(app)

// update  data of product by name http://localhost:3000/updateproduct
productroutes.updatebyId(app)

// delete product by name http://localhost:3000/deleteproductByname/:name
productroutes.deleteProductByname(app)

app.listen(port, () => {
  console.log(`listen port ${port}`);
});

/*     ------------------------------------   orders routes ----------------------------------  */

// create orders http://localhost:3000/createOrder
app.use('/', orderroutes.routes);

//  http://localhost:3000/allorders
orderroutes.orderindex(app);

//  http://localhost:3000/getorderByid/:id
orderroutes.showorder(app);

//  http://localhost:3000/updateorder
orderroutes.updatebyId(app);

//  http://localhost:3000/deleteorderByid/:id
orderroutes.deleteByid(app);

/*     ------------------------------------   OrdersProducts routes ----------------------------------  */

// create product http://localhost:3000/createOrdersProducts
OrdersProductsroutes.createproduct(app)

// http://localhost:3000/allproducts
OrdersProductsroutes.prodcutindex(app)

// http://localhost:3000/getOrdersProducts/:id 
OrdersProductsroutes.showproduct(app)

// http://localhost:3000/updateOrdersProducts
OrdersProductsroutes.updatebyId(app)

// http://localhost:3000/deleteOrdersProductsByid/:id
OrdersProductsroutes.deleteProductByid(app)


export default app;
