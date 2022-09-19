"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// import * as orderroutes from '../controller/conorders';
// import * as productroutes from '../controller/conproducts';
// import * as OrdersProductsroutes from '../controller/conOrdersProducts'
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
const productdata = {
    price: 200,
    name: "Gold",
    seller: "jack"
};
const userdata = {
    first_name: "andriay",
    last_name: "rowland",
    user_name: "andra1",
    password: "rowland123",
    email: "roland@andria",
    id: 2
};
const orderdata = {
    users_id: 3,
    status: "open"
};
const orderId = { id: 1 };
describe("Test ALl EndPoint", () => {
    it("Create user", async () => {
        const response = await request.post("/createUsers").send(userdata);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it("GET All users", async () => {
        const response = await request.get("/allusers");
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it("sign_in user", async () => {
        const response = await request.post("/signin").send({
            user_name: userdata.user_name,
            password: userdata.password,
        });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
describe("test products API", () => {
    it("Create product", async () => {
        const response = await request.post("/createproduct").send(productdata);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it("GET All products", async () => {
        const response = await request.get("/allproducts");
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it(" get product by name", async () => {
        const response = await request.get("/getproductByname/:name");
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it("update Product ", async () => {
        const response = await request.patch("/updateproduct").send({ productdata });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
describe("test orders API", () => {
    it("Create order", async () => {
        const response = await request.post("/createOrder").send(orderdata);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it("GET All orders", async () => {
        const response = await request.get("/allorders");
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it(" get order by id", async () => {
        const response = await request.get(`/getorderByid/${orderId.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it("update order ", async () => {
        const response = await request.patch("/updateorder").send({ orderdata });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
it("DELETE order by id", async () => {
    const response = await request.get(`/deleteorderByid/${orderId.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
it("DELETE Product by name", async () => {
    const response = await request.get(`/deleteproductByname/${productdata.name}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
it("DELETE user by id", async () => {
    const response = await request.get(`/deleteUserByid/${userdata.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
});
