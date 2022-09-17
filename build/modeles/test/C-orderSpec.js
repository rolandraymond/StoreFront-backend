"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const dataoforder = new orders_1.listorder;
describe("order  list function", () => {
    it("should have an index (get all) function", () => {
        expect(dataoforder.index).toBeDefined();
    });
    it("should have a show function", () => {
        expect(dataoforder.show).toBeDefined();
    });
    it("should have a create function", () => {
        expect(dataoforder.create).toBeDefined();
    });
    it('you should have a updata function', () => {
        expect(dataoforder.update).toBeDefined();
    });
    it('you should have a delete function', () => {
        expect(dataoforder.deleteByid).toBeDefined();
    });
});
