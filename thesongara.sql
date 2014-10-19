DROP DATABASE IF EXISTS the_songara;
CREATE DATABASE the_songara CHARSET utf8 COLLATE utf8_general_ci;

USE the_songara;

DROP TABLE IF EXISTS user_account; 
create table user_account(
    id bigint primary key AUTO_INCREMENT,
    username varchar(15)unique,
    password varchar(15),
    full_name varchar(60),
	date_of_birth date,
    active boolean default false,    
    phone_no1 varchar(20),
    phone_no2 varchar(20),
    email_address varchar(50),
    address varchar(300),
    photo_file bigint,
    about_me varchar(1000)
)Engine=InnoDB;

insert into user_account values(1,"rajpal","songara","SONGARA RAJPALSINH BHIKHUSINH","1986-08-11",true,"+91-9687053542","+91-9426721546","rajpal.619@gmail.com","vadodara",0,"I Am Rajpals - The Rockstra."); 
insert into user_account values(2,"yuvi","songara","SONGARA YAJUVENDRASINH BHIKHUSINH","1989-11-11",true,"+91-9427377656","+91-9426721546","yuvi.songara@gmail.com","vadodara",0,"PAPPUUU.");
insert into user_account values(3,"GUEST","GU35T","GUEST",null,false,null,null,null,null,0,"I'M GUEST");


DROP TABLE IF EXISTS role;
create table user_role(
    id bigint primary key AUTO_INCREMENT,
	user_account_id bigint,
	role_name ENUM('ADMIN', 'MANAGER', 'USER','GUEST'),
	INDEX (user_account_id),
	FOREIGN KEY (user_account_id) REFERENCES user_account(id)
)Engine=InnoDB;

insert into user_role values(1,1,'ADMIN');
insert into user_role values(2,2,'USER');
insert into user_role values(3,3,'GUEST');

DROP TABLE IF EXISTS album;
create table album(
    id bigint primary key AUTO_INCREMENT,
	name varchar(60),
	description varchar(300),
	created_by bigint,
	INDEX (created_by),
	FOREIGN KEY (created_by) REFERENCES user_account(id)
)Engine=InnoDB;

insert into album values(1,"default","defaults",1);

DROP TABLE IF EXISTS file;
create table file(
	id bigint primary key AUTO_INCREMENT,
	name varchar(60),
	imagepath varchar(150),
	index_no int,
	album_id bigint,
	INDEX (album_id),
	FOREIGN KEY (album_id) REFERENCES album(id)
)Engine=InnoDB;


DROP TABLE IF EXISTS comments;
create table comments(
	id bigint primary key AUTO_INCREMENT,
	comment_type varchar(30),
	image_name bigint,
	data varchar(300),
	user_id bigint,
	INDEX (user_id),
	FOREIGN KEY (user_id) REFERENCES user_account(id)

)Engine=InnoDB;

DROP TABLE IF EXISTS question;
create table question(
	id bigint primary key AUTO_INCREMENT,
	question varchar(300) not null,
	question_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id bigint,
	INDEX (user_id),
	FOREIGN KEY (user_id) REFERENCES user_account(id)
)Engine=InnoDB;

insert into question values(1,"What Is A Pincode Number OF Bolundra ?","2014-01-01 04:19:03",1);
insert into question values(2,"Which Is Your Best Place In Bolundra ?","2014-01-02 08:19:03",1);
insert into question values(3,"What is a Name Of Cricket Ground Of Bolundra ?","2014-01-01 06:19:03",1);
insert into question values(4,"How Many Of you Attend a Bolundra Prathmik Shala ?","2014-01-02 16:19:03",1);

DROP TABLE IF EXISTS answer;
create table answer(
	id bigint primary key AUTO_INCREMENT,
	answer varchar(1000) not null,
	answer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	question_id bigint,
	user_id bigint,
	INDEX (question_id),
	FOREIGN KEY (question_id) REFERENCES question(id),
	INDEX (user_id),
	FOREIGN KEY (user_id) REFERENCES user_account(id)
)Engine=InnoDB;
insert into answer values(1,"390021","2014-01-01 12:19:03",1,1);
insert into answer values(2,"390021","2014-01-01 17:19:03",1,2);
insert into answer values(3,"Mahadevji Na Mandir No Otlo","2014-01-02 04:19:03",2,1);
insert into answer values(4,"School Nu Cricket Ground","2014-01-02 16:19:03",2,2);
insert into answer values(5,"BODYO NU INTERNATIONAL GROUND","2014-01-02 17:19:03",3,1);
insert into answer values(6,"BODYOOOOOOOOOOOOO - One and Only One","2014-01-02 18:19:03",3,2);
insert into answer values(7,"I DID","2014-01-02 19:19:03",4,1);
insert into answer values(8,"I Did Not","2014-01-02 20:19:03",4,2);


DROP TABLE IF EXISTS question_user_notification;
create table question_user_notification(
	id bigint primary key AUTO_INCREMENT,
	question_id bigint,
	user_id bigint,
	INDEX (question_id),
	FOREIGN KEY (question_id) REFERENCES question(id),
 	INDEX (user_id),
	FOREIGN KEY (user_id) REFERENCES user_account(id)
)Engine=InnoDB;
insert into question_user_notification values(1,1,1);
insert into question_user_notification values(2,1,2);

DROP TABLE IF EXISTS action;
create table action(
	id bigint primary key AUTO_INCREMENT,
	action_name varchar(20),
	display_name varchar(50),
	parent_action_id bigint,
	display_flag boolean default true,
	locale varchar(2),
	INDEX (parent_action_id) 
)Engine=InnoDB;

insert into action values(1,null,"THE_SONGARA",null,false,"gu");

alter table action 
add CONSTRAINT parent_action_id
FOREIGN KEY (parent_action_id) REFERENCES action(id);

insert into action values(2,"home","Home",1,true,"en");
insert into action values(3,"home","હોમ",1,true,"gu");
insert into action values(4,"history","History",1,true,"en");
insert into action values(5,"history","ઈતિહાસ",1,true,"gu");
insert into action values(6,"contact","Contacts",1,true,"en");
insert into action values(7,"contact","સંપર્ક",1,true,"gu");
insert into action values(8,"document","Documents",1,true,"en");
insert into action values(9,"document","દસ્તાવેજ",1,true,"gu");


/*select * from action where id not in 
(select distinct parent_action_id from action where parent_action_id is not null);*/
