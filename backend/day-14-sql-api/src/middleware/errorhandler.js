const errorHandler = (err, req, res, next) =>{
    const message = err.message || "";
    if(message.startsWith("Err_db1")){
        return res.status(404).json({success:false, errorId:message})
    }else if(message.startsWith("Err_dbId")){
        return res.status(404).json({success:false, errorId:message})
    }
    else if(message.startsWith("Err_dbQr")){
        return res.status(404).json({success:false, errorId:message})
    }else if(message.startsWith("Err_WrQr")){
        return res.status(404).json({success:false, errorId:message})
    }
    return res.status(500).json({ success: false, errorId: "ERR_INTERNAL"
    })};

export default errorHandler;