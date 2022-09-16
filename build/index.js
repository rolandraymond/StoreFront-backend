"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conUsers_1 = __importDefault(require("./controller/conUsers"));
const orders_routers_1 = __importDefault(require("./routes/api/orders_routers"));
// config server 
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", conUsers_1.default.routes);
app.post('/', (req, res) => {
    res.json({
        massaage: 'hallo world',
        data: req.body
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
// create orders http://localhost:3000/createOrder
app.use("/", orders_routers_1.default);
exports.default = app;
