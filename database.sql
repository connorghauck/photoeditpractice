--first time table is created will have to hard code the admin user BOOLEAN value as true
CREATE TABLE users (
id SERIAL PRIMARY KEY,
googleID varchar(1000)  NOT NULL,
email varchar(1000) NOT NULL,
google_name varchar (1000),
accessToken varchar (1000),
refreshToken varchar (1000),
admin BOOLEAN DEFAULT FALSE,
alexander_ramsey_house BOOLEAN DEFAULT FALSE,
birch_coulee_battlefield BOOLEAN DEFAULT FALSE,
charles_a_lindbergh_historic_site BOOLEAN DEFAULT FALSE,
comstock_house BOOLEAN DEFAULT FALSE,
folsom_house BOOLEAN DEFAULT FALSE,
fort_ridgely BOOLEAN DEFAULT FALSE,
harkin_store BOOLEAN DEFAULT FALSE,
historic_forestville BOOLEAN DEFAULT FALSE,
historic_fort_snelling BOOLEAN DEFAULT FALSE,
james_j_hill_house BOOLEAN DEFAULT FALSE,
jeffers_petroglyphs BOOLEAN DEFAULT FALSE,
lac_qui_parle_mission BOOLEAN DEFAULT FALSE,
lower_sioux_agency BOOLEAN DEFAULT FALSE,
marine_mill BOOLEAN DEFAULT FALSE,
mill_city_museum BOOLEAN DEFAULT FALSE,
mille_lacs_indian_museum BOOLEAN DEFAULT FALSE,
minnehaha_depot BOOLEAN DEFAULT FALSE,
minnesota_history_center BOOLEAN DEFAULT FALSE,
gale_family_library BOOLEAN DEFAULT FALSE,
minnesota_state_capitol BOOLEAN DEFAULT FALSE,
north_west_company_fur_post BOOLEAN DEFAULT FALSE,
oliver_kelley_farm BOOLEAN DEFAULT FALSE,
sibley_historic_site BOOLEAN DEFAULT FALSE,
split_rock_lighthouse BOOLEAN DEFAULT FALSE,
traverse_des_sioux BOOLEAN DEFAULT FALSE,
w_w_mayo_house BOOLEAN DEFAULT FALSE
);


CREATE TABLE departments (
id SERIAL PRIMARY KEY,
department varchar(120) NOT NULL
);

--url is the url of the image on s3
CREATE TABLE images (
id SERIAL PRIMARY KEY,
url_image varchar(1000) NOT NULL,
department_id int NOT NULL
);

--url is the url of the brand on s3
CREATE TABLE brands (
id SERIAL PRIMARY KEY,
url_brand varchar(1000) NOT NULL,
department_id int NOT NULL
);

CREATE TABLE submissions (
id SERIAL PRIMARY KEY,
saved_edit varchar(5000),
status varchar(120),
user_id int NOT NULL,
department_id int,
image_id int,
brand_id int,
admin_comment varchar(1000),
user_comment varchar(1000)
);

--Populate departments with correct names
INSERT INTO departments (department)
VALUES
('alexander_ramsey_house'),
('birch_coulee_battlefield'),
('charles_a_lindbergh_historic_site'),
('comstock_house'),
('folsom_house'),
('fort_ridgely'),
('harkin_store'),
('historic_forestville'),
('historic_fort_snelling'),
('james_j_hill_house'),
('jeffers_petroglyphs'),
('lac_qui_parle_mission'),
('lower_sioux_agency'),
('marine_mill'),
('mill_city_museum'),
('mille_lacs_indian_museum'),
('minnehaha_depot'),
('minnesota_history_center'),
('gale_family_library'),
('minnesota_state_capitol'),
('north_west_company_fur_post'),
('oliver_kelley_farm'),
('sibley_historic_site'),
('split_rock_lighthouse'),
('traverse_des_sioux'),
('w_w_mayo_house')
;
