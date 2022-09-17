"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conUsers_1 = __importDefault(require("./controller/conUsers"));
const orderroutes = __importStar(require("./controller/conorders"));
const productroutes = __importStar(require("./controller/conproducts"));
// config server
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
//  http://localhost:3000/createUsers  user diffrant way to create user
app.use('/', conUsers_1.default.routes);
app.post('/', (req, res) => {
    res.json({
        massaage: 'hallo world',
        data: req.body,
    });
});
// http://localhost:3000/allusers
conUsers_1.default.userindex(app);
// http://localhost:3000/getuserByid/:id
conUsers_1.default.showuser(app);
// http://localhost:3000/deleteUserByid/:id
conUsers_1.default.deleteByid(app);
//http://localhost:3000/updateuser
conUsers_1.default.updatebyId(app);
//  http://localhost:3000/signin
conUsers_1.default.sgin_user(app);
/*     ------------------------------------   products routes ----------------------------------  */
// create product http://localhost:3000/createproduct
productroutes.createproduct(app);
// get all products  http://localhost:3000/allproducts
productroutes.prodcutindex(app);
// get specifically by name  http://localhost:3000/getproductByname/name 
productroutes.showproduct(app);
// update  data of product by name http://localhost:3000/updateproduct
productroutes.updatebyname(app);
// delete product by name http://localhost:3000/deleteproductByid/:name
productroutes.deleteProductByname(app);
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
exports.default = app;
