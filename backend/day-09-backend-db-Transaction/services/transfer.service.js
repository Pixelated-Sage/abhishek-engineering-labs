

class transferService {
    constructor(pool,TransferRepo){
        this.pool = pool;
        this.TransferRepo = TransferRepo;
    }
    async amountTransfer(from,too,amount){
        const txclient =  await this.pool.connect();

        try{
            await txclient.query('BEGIN');
            await this.TransferRepo.debit(from,amount,txclient);
            await this.TransferRepo.credit(too,amount,txclient);
            console.log("credit done");
            await txclient.query('COMMIT');
            return {success:true};
        }catch(error){
            await txclient.query('ROLLBACK');
            throw error;
        }finally {
            txclient.release();
        }

    }
}

export default transferService;