import json
from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import jwt

app = Flask(__name__)
CORS(app)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'dell5559'
app.config['MYSQL_DB'] = 'taskupdater'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

@app.route('/signup',methods=["POST"])
def addUser():
    user_name = request.json["user_name"]
    email=request.json["email"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO user(user_name,email,password) VALUES (%s,%s,%s) """, [user_name,email,password])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Successfully Created")

@app.route('/login',methods=["POST"])
def login():
    flag = False
    email = request.json["email"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from user where email = (%s) and password = (%s)""",[email,password])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    for user in result:
        if str(user["email"]) == str(email) and str(user["password"]) == str(password):
            flag = True
            encoded_jwt = jwt.encode({"user_id":user["user_id"],"user_name":user["user_name"]}, 'secretkey', algorithm='HS256').decode("utf-8")
    if flag == True:
        return json.dumps(str(encoded_jwt))
    else:
        return json.dumps("Wrong Password")

@app.route('/get-user-token')
def getUserByToken():
    auth_header = request.headers.get('Authorization')
    print(auth_header)
    token_encoded = auth_header.split(' ')[1]
    print(token_encoded)

    decode_data = jwt.decode(token_encoded, 'secretkey', algorithms=['HS256'])
    return json.dumps(decode_data)

@app.route('/delete-tasklist',methods=["DELETE"])
def deleteTaskList():
    user_id = request.headers.get("user_id")
    tasklist_id = request.headers.get("tasklist_id")
    print(user_id,tasklist_id)
    cursor = mysql.connection.cursor()
    cursor.execute(""" delete from taskItem where tasklist_id =(%s)""",[tasklist_id])  
    cursor.execute(""" delete from tasklist where user_id =(%s) and tasklist_id =(%s)""",[user_id,tasklist_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

@app.route('/add-tasklist',methods=["POST"])
def addTaskList():
    user_id = request.json["user_id"]
    tasklist_name = request.json["tasklist_name"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO tasklist(tasklist_name,user_id) VALUES (%s,%s) """, [tasklist_name,user_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

@app.route('/add-taskItem/<int:tasklist_id>',methods=["POST"])
def addTaskItem(tasklist_id):
    taskItem_name = request.json["taskItem_name"]
    flag = 0
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO taskItem(taskItem_name,tasklist_id,flag) VALUES (%s,%s,%s) """, [taskItem_name,tasklist_id,flag])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

@app.route('/get-task-list/<int:user_id>')
def getTaskListComplete(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("""select tasklist.tasklist_name,tasklist.tasklist_id, count(taskItem_id) as taskitems from tasklist left join taskItem on tasklist.tasklist_id = taskItem.tasklist_id where tasklist.user_id = (%s)  group by tasklist.tasklist_id;""",[user_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-task-Item-not/<int:tasklist_id>')
def getTaskItemNotComplete(tasklist_id):
    cursor = mysql.connection.cursor()
    cursor.execute("""select taskItem_name,taskItem_id from taskItem join tasklist on tasklist.tasklist_id = taskItem.tasklist_id  where tasklist.tasklist_id =(%s) and flag = 0 """,[tasklist_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-task-Item-all/<int:tasklist_id>')
def getAllTaskItem(tasklist_id):
    cursor = mysql.connection.cursor()
    cursor.execute("""select taskItem_name,taskItem_id from taskItem join tasklist on tasklist.tasklist_id = taskItem.tasklist_id  where tasklist.tasklist_id =(%s) """,[tasklist_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-task-Item-complete/<int:tasklist_id>')
def getTaskItemComplete(tasklist_id):
    cursor = mysql.connection.cursor()
    cursor.execute("""select taskItem_name,taskItem_id from taskItem join tasklist on tasklist.tasklist_id = taskItem.tasklist_id  where tasklist.tasklist_id =(%s) and flag = 1 """,[tasklist_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/mark-task-Item/<int:taskItem_id>',methods=["POST"])
def markTaskItem(taskItem_id):
    flag = 1
    cursor = mysql.connection.cursor()
    cursor.execute("""update taskItem set flag =(%s) where taskItem_id=(%s)""",[flag,taskItem_id])
    print(flag)
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)


if __name__ == "__main__":
    app.run(debug = True)



