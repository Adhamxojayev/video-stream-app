import supertest from "supertest";
import app from '../src/server.js';

const request = supertest(app)

describe("auth login", () => {

    test("/POST login wrong", async () => {
        const response = await request.post('/login').set('Content-Type', 'application/json').send({
            username: "salim",
            password: "123456789"
        })
        expect(response.status).toEqual(401)
    })

    test("/POST login success", async () => {
        const response = await request.post('/login').set('Content-Type', 'application/json').send({
            username: "ali",
            password: "1111"
        })
        expect(response.status).toEqual(200)
    })

})

describe("auth register", () => {
    
    test("/POST register sucess", async () => {
      const response = await request
        .post("/register")
        .set("Content-Type", "multipart/form-data")
        .attach("avatar", 'photo path')
        .field("username", "nodir")
        .field("password", "123456789");

        expect(response.status).toEqual(201);
    });

});

