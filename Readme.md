**Note:** Kindly add *node modules* to run this application

**Steps to add node module:**

```
$ npm create-react-app <filename>
	cd <filename>
	npm install

```

Copy the node modules folder from file you just created and paste in the *frontend* folder

## BACK-END REQUIREMENTS

### Pip installation:

```
$ sudo apt install python-pip

```

### Flask installation:

```
$ pip install Flask

```

### Flask_PyMySql Installation:

```
$ pip install flask-mysql

```

### PyMySql installation:

```
$ python3 -m pip install PyMySQL

```

### Jwt Installation:

```
$ pip install pyjwt or pip install jwt

```

### Flask-CORS Installation:

```
$ pip install -U flask-cors

```

### MySqlDB installation:

**Step 1:**

```
$ sudo apt update

```

**Step 2:**

```
$ sudo apt install mysql-server

```

**Step 3:**

```
$ sudo mysql_secure_installation

```

**Step 4:**

```
$ systemctl status mysql.service

```

**Starting the server**

```
$ sudo service mysql start

```

**Stopping the server**

```
$ sudo service mysql stop

```

## FRONT-END REQUIREMENTS

### NPM installation:

```
$ npm install

```

### Axios Installation:

```
$ npm install axios

```

### React-Router-Dom Installation:

```
$ npm install --save react-router-dom

```



### To run the application:

**Step 1:**

Navigate to the folder where **server.py** is located and type the following commands in the terminal to run flask

```
$ export FLASK_ENV=development 
$ export FLASK_APP=server.py
$ flask run
  or (directly)
$ python3 server.py

```

**Step 2:**

Open new tab in the terminal and type the following command to run the mongoDB server

```
$ mysql -u root -p
[It will ask for the password and once it is done run below command]


```

**Step 3:**

Open new tab in the terminal and navigate to the folder where the **src** folder is located and run the following command

```
$ npm start
```

**DataBase Creation:**

**step 1**

- Name of the database :-  taskupdater

- Table Name : taskItem , tasklist , user  

- taskItem contains fields :  taskItem_id, taskItem_name, flag, tasklist_id

- tasklist contains fields : tasklist_id,tasklist_name,user_id

- user contains feilds : user_id , user_name, email, password

  ​

**step 2 **

- Create user table :

  ```create table user (user_id int not null auto_increment, user_name varchar(30) int not null,email varchar(30) int not null, password varchar(255) int not null )
  create table user(user_id int not null auto_increment,user_name varchar(255) not null,email varchar(255) not null,password varchar(255) not null,primary key(user_id))

  ```


- create tasklist table :

  ```
  create table tasklist(tasklist_id int not null auto_increment,tasklist_name varchar(255) not null ,user_id int not null,foreign key(user_id) references user(user_id),primary key(tasklist_id))
  ```

- create taskItem table :

  ```
  create table taskItem(taskItem_id  int not null auto_increment,taskItem_name  varchar(255) not null ,flag int not null, tasklist_id  int not null,foreign key( tasklist_id ) references  tasklist( tasklist_id ),primary key(taskItem_id))
  ```

  ​