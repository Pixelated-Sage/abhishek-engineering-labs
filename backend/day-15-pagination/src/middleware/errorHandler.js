const errorHandler = (err, req, res, next) =>{
    const message = err.message || "";
    if(message.startsWith("Err_vlu")){
        return res.status(404).json({success:false, errorId:message})
    }else if(message.startsWith("Err_NoPage")){
        return res.status(404).json({success:false, errorId:message})
    }
    return res.status(500).json({ success: false, errorId: "ERR_INTERNAL"
    })};

export default errorHandler;