drop table user_info purge
/
create table user_info(id varchar2(200) primary key, passwd varchar2(200), email varchar2(200))
/
insert into user_info values('abc001', 'password1','abc@def.com')
/
insert into user_info values('def002', 'password3','bca@def.com')
/
insert into user_info values('ghi003', 'password2','abc@def.kr')
/
insert into user_info values('jkl004', 'password4','abc@def.jp')
/


select * from user_info;