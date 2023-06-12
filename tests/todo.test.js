const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../index')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const Todo = require('../models/Todo')
const { userRegister, userLogin } = require('../services/userService')
const { todoAdd, todoDelet, todoGet, todoUpdate, todoView } = require('../services/todoService')

require('dotenv').config();

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "ashok",
    email: "ashok@gmail.com",
    password: "123",
    token: jwt.sign({ _id: userOneId }, process.env.skey)
};


const todoOneId = new mongoose.Types.ObjectId()
const todoOne = {
    _id: todoOneId,
    name: "ashok",
    status: "added",
    description: "about node",
    user: userOne._id
};


beforeEach(async () => {
    await mongoose.connect(process.env.dburl);

    await User.deleteMany()
    const user = new User(userOne)
    await user.save()

    await Todo.deleteMany()
    const todos = new Todo(todoOne)
    await todos.save()
});


afterEach(async () => {
    await mongoose.connection.close();
});

describe("user registeration and login", () => {

    it("should create a user", async () => {
        const res = await request(app).post("/api/user/register").send({ userOne });
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(500)
    });



    it("should login a user", async () => {
        const res = await request(app).post("/api/user/login").send({
            email: userOne.email,
            password: userOne.password
        });
        expect(res.statusCode).toBe(200);
    });

});



describe("check error when user registeration and login", () => {

    it("should handle error when fetching data from user registration", async () => {
        try {
            await userRegister();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it("should handle error when fetching data from user login", async () => {
        try {
            await userLogin();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

});



describe("todo app operation", () => {

    it("should create a todo", async () => {
        const res = await request(app).post("/api/todo/add").set('Authorization', `${userOne.token}`).send({ todoOne });
        expect(res.statusCode).toBe(200);
    });

    it("should update a todo", async () => {
        const res = await request(app).put(`/api/todo/update/${todoOne._id}`).set('Authorization', `${userOne.token}`).send({
            name: "amit"
        });
        expect(res.statusCode).toBe(200);
    });

    it("should delete a todo", async () => {
        const res = await request(app).delete(`/api/todo/delete/${todoOne._id}`).set('Authorization', `${userOne.token}`);
        expect(res.statusCode).toBe(200);
    });

    it("should view todo by id", async () => {
        const res = await request(app).get(`/api/todo/view/${todoOne._id}`).set('Authorization', `${userOne.token}`);
        expect(res.statusCode).toBe(200);
    });

    it("should return all todos", async () => {
        const res = await request(app).get("/api/todo/get");
        expect(res.statusCode).toBe(200);
    });
});


describe("check error when todo app operation", () => {

    it("should handle error when create todo", async () => {
        try {
            await todoAdd();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it("should handle error when update todo", async () => {
        try {
            await todoUpdate();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it("should handle error when delete todo", async () => {
        try {
            await todoDelet();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it("should handle error when view todo by id", async () => {
        try {
            await todoView();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it("should handle error when view all todo", async () => {
        try {
            await todoGet();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});