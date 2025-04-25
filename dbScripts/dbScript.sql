
---     Creating Tables     ---

---     users table     ---
create table users (
    id SERIAL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    unique(email)
);

---     content_type table      ---

create table content_type(
	id serial,
	type varchar(20) not null,
	primary key (id)
)

---     content table       ---
create table content(
	id serial,
	name 			varchar(30) not null,
	release_date 	date not null,
	watch_time  	time not null,
	description 	varchar(10000) not null,
	poster      	varchar(2083) not null,
	trailer_link	varchar(2083) not null,
	type_id         int not null,
	primary key (id),
	foreign key (type_id) references content_type(id)
	
)

---     genres table        ---

create table genres(
	id serial,
	genre varchar(20) not null,
	primary key(id)
)

---     content genres table        ---

create table content_genres(
	content_id int not null,
	genre_id   int not null,
	primary key(content_id,genre_id),
	foreign key (content_id) references content(id),
	foreign key (genre_id) references genres(id)
	
)

---     watchlist table    ---

create table watchlist (
	user_id int not null,
	content_id int not null,
	primary key(user_id,content_id),
	foreign key (user_id) references users(id),
	foreign key (content_id) references content(id)
)

---     reviews table       ---

create table reviews(
	id serial,
	user_id int not null,
	content_id int not null,
	stars int not null check(stars BETWEEN 1 AND 10),
	comment varchar(10000) not null,
	primary key (id),
	foreign key (user_id) references users(id),
	foreign key (content_id) references content(id),
	unique(user_id,content_id)
	
)