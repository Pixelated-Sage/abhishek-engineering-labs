SELECT 
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
WHERE u.email = 'abhishekaj590@gmail.com';

SELECT 
    ps.id, 
    ps.title, 
    ps.content
FROM posts ps
JOIN users u ON ps.owner_id = u.id::text
WHERE u.email = 'abhishekaj590@gmail.com';
