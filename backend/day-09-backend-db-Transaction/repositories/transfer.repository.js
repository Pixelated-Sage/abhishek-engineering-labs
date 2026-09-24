class TransferRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async credit(Id, amount, txclient = null) {
        const bank = txclient || this.pool;
        const query = "update accounts set balance = balance + $1 where id = $2 returning balance"
        const result = await bank.query(query, [amount, Id])
    
        if (result.rows.length === 0) {
            throw new Error(`Account row for ID ${Id} does not exist!`);
        }
        return result.rows[0];
    }
    async debit(Id, amount, txclient = null) {
        const bank = txclient || this.pool;
        const query = "update accounts set balance = balance - $1 where id = $2 returning balance"
        
        console.log("Debit is started")
        const result = await bank.query(query, [amount, Id])
        console.log("debit end")
        if (result.rows.length === 0) {
            throw new Error(`Account row for ID ${Id} does not exist!`);
        }
        console.log("printing result")
        console.log(result);
        console.log("ending result")

        return result.rows[0];
    }
}

export default TransferRepository;