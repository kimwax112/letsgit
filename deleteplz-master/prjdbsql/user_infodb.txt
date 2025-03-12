drop table user_info purge
/
create table user_info(
    id varchar2(200) primary key,
    passwd varchar2(200),
    email varchar2(200),
    name varchar2(200),
    tel varchar2(200),
    birthdate varchar2(200),
    gender varchar2(50)
)
/
insert into user_info values('abc001', 'password1','abc@def.com', 'Alice', '010-1234-5678', '1990-01-01', 'Female')
/
insert into user_info values('def002', 'password3','bca@def.com', 'Bob', '010-2345-6789', '1992-02-02', 'Male')
/
insert into user_info values('ghi003', 'password2','abc@def.kr', 'Charlie', '010-3456-7890', '1994-03-03', 'Male')
/
insert into user_info values('jkl004', 'password4','abc@def.jp', 'Diana', '010-4567-8901', '1996-04-04', 'Female')