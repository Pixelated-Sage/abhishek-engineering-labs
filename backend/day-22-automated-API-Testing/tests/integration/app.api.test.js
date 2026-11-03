import request from 'supertest';
import app from '../../src/app.js';




// unexpected error when app is crashed 
// describe("POST /users", ()=>{
//     it("should give 500 as the application is crashed", async ()=>{
//         const userData = {
//                 "name":"Abhishek4",
//                 "email":"abhishekaj5904@gmail.com",
//                 "role":"user"
//             }
//         const response = await request(app)
//         .post("/users")
//         .send(userData)

//         expect(response.status).toBe(500);
//         expect(response.body.error).toBe("Internal server error")
//     })
// })


describe('GET /health', () => { 
    it("should return 200 OK", async ()=>{
        const response = await request(app)
        .get('/health')
        .expect(200);
        expect(response.body).toEqual({
            "message":"working"
        })
    })
 })

describe("POST /users", ()=>{
    it("should create a new user and return 201 created", async ()=>{
        const userData = {
                "name":"Abhishek4",
                "email":"abhishekaj5904@gmail.com",
                "role":"user"
            }
        const response = await request(app)
        .post("/users")
        .send(userData)

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("user Created successfully")
    })
})

describe("POST /users", ()=>{
    it("should try to create a user with invalid name and recieve 400", async ()=>{
        const userData = {
                "name":"Abh",
                "email":"abhishekaj5904@gmail.com",
                "role":"user"
            }
        const response = await request(app)
        .post("/users")
        .send(userData)

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body).toMatchObject({
            
            "success": false,
            "Message": "Your input values are wrong",
            "error": {
                "_errors": [],
                "name": {
                    "_errors": [
                        "Name cannot be empty or just space"
                    ]
                }
            }

        })
    })
})

describe("POST /users", ()=>{
    it("should try to create a user with invalid email and recieve 400", async ()=>{
        const userData = {
                "name":"Abhishek",
                "email":"abhishekaj5904gmail.com",
                "role":"user"
            }
        const response = await request(app)
        .post("/users")
        .send(userData)

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body).toMatchObject({
            "success": false,
            "Message": "Your input values are wrong",
            "error": {
                "_errors": [],
                "email": {
                    "_errors": [
                        "Invalid email format structure"
                    ]
                }
            }
        })
    })
})


describe("POST /users", ()=>{
    it("should create a existing user and return 422 ", async ()=>{
        const userData = {
                "name":"Abhishek4",
                "email":"abhishekaj5904@gmail.com",
                "role":"user"
            }
        const response = await request(app)
        .post("/users")
        .send(userData)

        expect(response.status).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("User already exist")
    })
})


describe("Get /admin",()=>{
    it("should return 404 as route not created",async ()=>{
        const response = await request(app)
        .get("/admin")
        .expect(404)
    })
})



