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
const conorders_1 = __importDefault(require("./controller/conorders"));
const productroutes = __importStar(require("./controller/conproducts"));
// config server
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', conUsers_1.default.routes);
app.post('/', (req, res) => {
    res.json({
        massaage: 'hallo world',
        data: req.body,
    });
});
conUsers_1.default.userindex(app);
conUsers_1.default.showuser(app);
conUsers_1.default.deleteByid(app);
conUsers_1.default.updatebyId(app);
conUsers_1.default.sgin_user(app);
app.listen(port, () => {
    console.log(`listen port ${port}`);
});
// create orders http://localhost:3000/createorder
app.use('/', conorders_1.default);
// create product http://localhost:3000/createproduct
productroutes.createproduct(app);
// delete product by name http://localhost:3000//deleteproductByid/:name
productroutes.deleteByid(app);
exports.default = app;
