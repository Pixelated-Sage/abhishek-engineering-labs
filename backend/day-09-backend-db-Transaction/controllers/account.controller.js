class transferController{
    constructor(transferService){
        this.transferService = transferService;
    }
    transferAmount = async (req, res, next) => {
    try{
        const U1 = req.body.from;
        const U2 = req.body.to;
        const amount = req.body.amount;

        if(!amount || amount===0){
            return res.status(400).json({message:"Amount is invalid"})
        }
        if(!U1 || !U2) {
            return res.status(400).json({message:"input Valid Users"})
        }
        const result = await this.transferService.amountTransfer(U1,U2,amount);
        console.log(result)
        return res.status(200).json(result);
    } catch(error){
        console.error(error.message);
        if (error.code === '23514'){
            return res.status(400).json({
                error:"Transaction Rejected",
                message:"Insufficient Funds"
            })
        }
        next(error);
    }

    }
}
export default transferController;