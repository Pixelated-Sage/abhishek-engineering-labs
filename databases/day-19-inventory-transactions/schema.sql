-- create table inventory(
--     Pid VARCHAR(10) primary key,
--     Pname varchar(30) not null,
--     stock integer not null check (stock>=0),
--     price numeric(10,2) not null check(price>=0)
-- );

-- INSERT into inventory (Pid, Pname ,stock, price)
-- VALUES
-- ('P01', 'dudh',10,35.32),
-- ('P02', 'chai',7,30.32),
-- ('P03', 'haldi',13,12.32),
-- ('P04', 'munch',20,5.00),
-- ('P05', 'dahi',12,30.00),
-- ('P06', 'ataa',4,170.00);



create table transactions (
    Tid varchar(10) primary key,
    Pid varchar(10) references inventory(Pid),
    quantity integer not null check (quantity >=0),
    created_at timestamptz default now()
);

