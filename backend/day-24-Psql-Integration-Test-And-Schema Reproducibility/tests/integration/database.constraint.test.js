import pg from "pg";
import { 
    describe,
    beforeEach, 
    it, 
    afterEach } from "vitest";
let client;

const pool = new pg.Pool({
    user: 'abhishek',
    host: 'localhost',
    database: 'engineering_lab_schema_check',
    port: 5432,
});

afterAll(async ()=>{
    await pool.end();
    
})

describe("users Table constraints checks", () => {
    beforeEach(async () =>{
        client = await pool.connect();
        try {
            const result = await client.query("select current_database()");
            const dbName = result.rows[0].current_database;
            console.log(dbName);
            if(dbName !== 'engineering_lab_schema_check'){
                throw new Error(`wrong database : ${dbName}`);
            }
            await client.query("BEGIN;");
            await client.query("truncate table users cascade;");
        }
        catch(err){
            client.release();
            throw err;
        }
    })
    afterEach(async ()=>{
        try{
            await client.query("ROLLBACK;");
        }finally{
            client.release();
        }
    })
    it("Insert a user with a valid email.", async ()=>{
        const result = await client.query("Insert into users(id,name,email,age) values ('U01', 'User01','test01@gmail.com',24) returning * ;")

        expect(result.rows).toHaveLength(1);
        expect(result.rows[0]).toMatchObject({
            id:'U01',
            email:"test01@gmail.com"
        })
    })
    it("Insert a user with a duplicate email.", async ()=>{
        await client.query("Insert into users(id,name,email,age) values ('U01', 'User01','test01@gmail.com',24);")
        const result = client.query("Insert into users(id,name,email,age) values ('U02', 'User01','test01@gmail.com',24) returning * ;")

        await expect(result).rejects.toMatchObject({
            table:'users',
            code:'23505',
            constraint:'users_email_key'
        })
    })
    it("Insert age smaller than 18 ",async () =>{
        const result = client.query("Insert into users(id,name,email,age) values ('U01', 'User01','test01@gmail.com',10);")

        await expect(result).rejects.toMatchObject({
            code:'23514',
            table:'users',
            constraint: 'users_age_check'
            
        })
    }) 
})
describe("courses Table constraints Checks", () =>{
    beforeEach(async () =>{
        client = await pool.connect();
        try {
            const result = await client.query("select current_database()");
            const dbName = result.rows[0].current_database;
            console.log(dbName);
            if(dbName !== 'engineering_lab_schema_check'){
                throw new Error(`wrong database : ${dbName}`);
            }
        } catch (err) {
            client.release();
            throw err;
        }
        await client.query("BEGIN;");
        await client.query("truncate table courses cascade;");
    })
    afterEach(async ()=>{
        try{
            await client.query("ROLLBACK;");
        }finally{
            client.release();
        }
    })

    it("lets check courses - name Not Null constraints", async ()=>{
        const result = client.query("Insert into courses(id,name) values ('C01', null);");

        await expect(result).rejects.toMatchObject({
            code:'23502',
            column:'name',
            detail:"Failing row contains (C01, null)."
        })

    })
    it("checks courses - id primary key constraint", async ()=>{
        await client.query("insert into courses (id,name) values ('C01','AI ML course');");
        const result = client.query("insert into courses (id,name) values ('C01','AI ML course');");

        await expect(result).rejects.toMatchObject({
            code: '23505',
            table:'courses',
            constraint: 'courses_pkey'
        })
 
    })
})

describe("Enrollment Table constraints Checks", ()=>{
    beforeEach(async () =>{
        client = await pool.connect();
        try {
            const result = await client.query("select current_database()");
            const dbName = result.rows[0].current_database;
            console.log(dbName);
            if(dbName !== 'engineering_lab_schema_check'){
                throw new Error(`wrong database : ${dbName}`);
            }
        } catch (err) {
            client.release();
            throw err;
        }
        await client.query("BEGIN;");
        await client.query("truncate table enrollments cascade;");
        await client.query("truncate table users cascade;");
        await client.query("truncate table courses cascade;");
    })
    afterEach(async ()=>{
        try{
            await client.query("ROLLBACK;");
        }finally{
            client.release();
        }
    })
    it("Attempt to insert an enrollment with a non-existent user_id.", async ()=>{
        await client.query("insert into courses (id,name) values ('C01','AI ML course');");
        const result = client.query("Insert into enrollments(id,user_id,course_id) values ('E01','U99','C01');");

        await expect(result).rejects.toMatchObject({
            code:'23503',
            table:'enrollments',
            constraint:'enrollments_user_id_fkey'
        })
    })
    it("Attempt to insert an enrollment with a existing user_id.", async ()=>{
        await client.query("insert into courses (id,name) values ('C01','AI ML course');");
        await client.query("insert into users(id, name, email,age) values('U01','User01','test@email.com', 24);");
        const result = await client.query("Insert into enrollments(id,user_id,course_id) values ('E01','U01','C01') returning *;");

        expect(result.rows).toHaveLength(1);
        expect(result.rows[0]).toMatchObject({
            id:'E01',
            user_id:'U01',
            course_id:'C01'
        })

    })
})