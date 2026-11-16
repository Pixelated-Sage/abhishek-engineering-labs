import pool from "../db/db.js"

const viewProfileRepo = async (sub) => {
    const userData = await pool.query(`SELECT 
                u.id AS user_id,
                u.username,
                u.email,
                r.name AS role,
                p.action AS permission
            FROM users u
            LEFT JOIN user_role ur ON u.id = ur.user_id
            LEFT JOIN roles r ON ur.role_id = r.id
            LEFT JOIN role_permissions rp ON r.id = rp.role_id
            LEFT JOIN permissions p ON rp.permission_id = p.id
            WHERE u.email = $1;
            `, [sub]);

    if (userData.rowCount === 0) {
        const error = new Error("P1 user does not exsist")
        error.status = 401;
        error.code = "P1";
        error.success = false;
        throw error;
    }
    const userPosts = await pool.query(`
            SELECT 
            ps.id, 
            ps.title, 
            ps.content
        FROM posts ps
        JOIN users u ON ps.owner_id = u.id::text
        WHERE u.email = $1;

                    `, [sub])
    if (userPosts.rowCount === 0) {
        const error = new Error("P1 user does not exsist")
        error.status = 401;
        error.code = "P1";
        error.success = false;
        throw error;
    }

    const totalOut = { userData: userData, Posts: userPosts };
    return totalOut;

}


export default viewProfileRepo;