import request from 'supertest';
import app from '../../src/app.js';
import pool from '../../database/db.js';
import { 
    describe, 
    it, 
    expect,  
    afterAll } from 'vitest';

function makeUserPayload(overrides = {}) {
    return {
        name: "Test User",
        email: `test-${Math.random()}@example.com`,
        role: "user",
        ...overrides
    };
}

async function createUserInDb(userPayload) {
    await pool.query("INSERT INTO users (name, email, role) VALUES ($1, $2, $3);",
        [userPayload.name, userPayload.email, userPayload.role]
    );
    return userPayload;
}



afterAll(async () => {
    await pool.end();
})

describe('GET /health', () => {
    it("should return 200 OK", async () => {
        const response = await request(app)
            .get('/health')
            .expect(200);
        expect(response.body).toEqual({
            "message": "working"
        })
    })
})

describe('POST /users', () => {
    beforeEach(async () => {
        const result = await pool.query('SELECT current_database();');
        const dbName = result.rows[0].current_database;
        console.log('Connected to database:', dbName);
        if(dbName !== 'engineering_lab_test'){
            throw new Error(`unsafe test database: ${dbName}`)
        }
        await pool.query('TRUNCATE TABLE users CASCADE;');
    })
    it("should create a new user and return 201 created", async () => {
        const userData = makeUserPayload({ name: "Abhishek", email: "abhishekaj590@gmail.com" });
        const response = await request(app)
            .post("/users")
            .send(userData)

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("user Created successfully")

        const dbCheck = await pool.query("SELECT * FROM users WHERE email = $1", [userData.email])
        expect(dbCheck.rows.length).toBe(1);
    })
    it("should try to create a user with invalid name and recieve 400", async () => {
        const userData = {
            "name": "Abh",
            "email": "abhishekaj5904@gmail.com",
            "role": "user"
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
    it("should try to create a user with invalid email and recieve 400", async () => {
        const userData = {
            "name": "Abhishek",
            "email": "abhishekaj5904gmail.com",
            "role": "user"
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
    it("should try to create a admin id and recieve 403", async () => {
        const userData = makeUserPayload({ role: "admin" });
        const response = await request(app)
            .post("/users")
            .send(userData)

        expect(response.status).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe("Unauthorized to create admin accounts")
    })
    it("should create a existing user and return 422 ", async () => {
        const userData = makeUserPayload({email:"duplicate_email@gmail.com"});

        await createUserInDb(userData);
        console.log(userData);

        const response = await request(app)
            .post("/users")
            .send(userData)

        expect(response.status).toBe(422);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("User already exist")
    })
})

describe('Fallback Routing', () => {
    it("should return 404 as route not created", async () => {
        await request(app)
            .get("/admin")
            .expect(404)
    })
})

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
//
//         expect(response.status).toBe(500);
//         expect(response.body.error).toBe("Internal server error")
//     })
// })

// beforeall(async () => {
// });

// afterall(async () => {
//     // teardown code after all tests
// });


