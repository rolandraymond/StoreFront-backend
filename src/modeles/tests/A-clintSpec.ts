
import { userlist } from '../client'




const Userlist = new userlist()





describe("Userlist function", () => {
    it("should have an index function", () => {
        expect(Userlist.index).toBeDefined();
    });

    it("should have a show function", () => {
        expect(Userlist.show).toBeDefined();
    });

    it("should have a create function", () => {
        expect(Userlist.create).toBeDefined();
    });

    it("should have a sign_in  function", () => {
        expect(Userlist.sign_in).toBeDefined();
    });

    it('create user  by create modle', async () => {
        const userdata = {
            last_name: 'roowland',
            first_name: 'test',
            password: "passowrd123",
            user_name: 'roolandtest',
            email: 'rooland@test'
        }


        const { user_name, email, last_name, first_name } = await Userlist.create(userdata);

        expect({ user_name, email, last_name, first_name }).toEqual({

            last_name: 'roowland',
            first_name: 'test',

            user_name: 'roolandtest',
            email: 'rooland@test'
        });
    });

    it('get all users by index method', async () => {
        const result = await Userlist.index();
        const { first_name, last_name, user_name, email } = result[0]
        expect({ first_name, last_name, user_name, email }).toEqual({
            first_name: 'test',
            last_name: 'roowland',
            user_name: 'roolandtest',

            email: 'rooland@test'
        });
    });

    it('Get user By useing id by show method', async () => {
        const result = await Userlist.show("2");
        const { first_name, last_name, user_name, email } = result

        expect({ first_name, last_name, user_name, email }).toEqual({

            last_name: 'roowland',
            first_name: 'test',

            user_name: 'roolandtest',
            email: 'rooland@test'
        });
    });

    it('delete user by user id using id method', async () => {
        await Userlist.deleteByid('2');
        const result = await Userlist.index()

        expect(result).toEqual([]);


    });
})
