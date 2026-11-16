


const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    if(err.code === '42703'){
        res.status(400).json({
            success: false,
            error: "U01 Invalid request body",
            message: "username already exists"
        });
        return;
    }
    res.status(status).json({
        success: false,
        error: err.code || "Internal Server Error",
        message: status === 500 ? "Internal Server Error" : err.message
    });
};

export default errorHandler;