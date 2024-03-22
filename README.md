# COMP9900 Information Technology Project 

# Charity Management System

# Team: HyruleCastle

| Members        | ZID      | Email                              | Division                 |
| -------------- | -------- | ---------------------------------- | ------------------------ |
| Tianyu Liu     | z5357059 | z5357059@ad.unsw.edu.au            | Front-end (Scrum Master) |
| Pengxu Chen    | z5396620 | z5396620@ad.unsw.edu.au            | Front-end                |
| Jiaying Liang  | z5318698 | Jiaying.liang2@student.unsw.edu.au | Front-end                |
| Jialiang Yi    | z5349085 | z5349085@ad.unsw.edu.au            | Back-end                 |
| Honggang Zhang | z5324855 | z5324855@ad.unsw.edu.au            | Back-end                 |

# 1 Getting Started

## 1-1 Preparation

1. Database: MySQL 8
2. Java: JDK 17

## 1-2 Database

1. First make sure you have the correct version of MySQL installed.
2. Use the command line or GUI to import the `Hyrule.sql` file into the database.
   1. Log in to the MySQL server: `mysql -u your_username -p`
   2. Select the target database to import the data into (if you have not already created one, create an empty database first): `USE your_database_name;`
   3. Import sql file: `SOURCE /path/file.sql;`, replace `/path/file.sql` with the full path to your SQL file.

## 1-3 Back-end Project

The `back-end` file under the root directory is the complete source code of the back-end project. You can choose to import it into code tools such as the IDEA, import dependencies using maven, and then you can run the project after modifying database configuration in `src/main/resources/application.yml` according to your database.

The back-end project has been packaged as a jar file, which you can find in the root directory: `back-end-0.0.1-SNAPSHOT.jar`, therefore, using the following methods can make it easier and faster to run back-end projects

1. First, locate the `application.properties` file in the root directory, open it, and make the following changes to the configuration information based on your own database

   1. Back-end project port number: `server.port=8090`
   2. Database: `spring.datasource.url = jdbc:mysql://localhost:3306/Hyrule`
   3. Database user name: `spring.datasource.username = root`
   4. Database password: `spring.datasource.password = 123`

2. Run the following command under this folder to start the back-end project (Make sure that `.jar` and `.properties` are in the same file and that you are in that file)

   `java -jar back-end-0.0.1-SNAPSHOT.jar`

## 1-4 Front-end Project

The `front-end` file under the root directory is the complete source code of the front-end project. You can choose to import it into code tools such as the VScode. All dependencies saved in package.json. 
If you want to start the front-end. 

1. First, you need to open the terminal under the front-end file and run command `yarn install` to install all dependencies. If you are stuck by this step, plesase run this command in mac system `sudo yarn install`
2. Run command `yarn start` to start the project.

# 2 Back-end Interfaces

## 2-1 Data encapsulation

### Returned data

First, the back-end project encapsulates the data returned to the front end so that it is easier for the front end to know if the request was successful. The form of the returned data is as follows:

``````json
{
	“code”: 200/400,
	“msg”: “success”/”fail”,
	“total”: 0,
	“data”: []
}
``````

Where “code” is the status code of the request, 200 and 400 correspond to success and fail in “msg” respectively, and “total” represents the total number of returned data. The returned data is located in “data”.

### Paging Query

The incoming parameters of the interfaces involved in paging queries are also encapsulated, in the following form:

``````json
{
	“pageSize”: …,
	“pageNum”: …,
	“params”: {
		...
	}
}
``````

Where “pageSize” represents the amount of data per page and “pageNum” represents the current page. These two parameters are optional. Their default values are 20 and 1 respectively, but if these two parameters are passed when the interface is requested, it must be specified explicitly and cannot be passed null values. In “params” are the query criteria.

## 2-2 User

| Interfaces     | Type | Argument                                          | Comment                                                      |
| -------------- | :--- | ------------------------------------------------- | ------------------------------------------------------------ |
| /user/login    | POST | {  “no”: …, “password”: …,}                       | If the login succeeds, 200 is returned,  and if the login fails, 400 is returned. |
| /user/register | POST | {  “no”: …, “password”: …,   “role”: …  }         | A successful registration will generate  the corresponding data in the user, info and point tables. |
| /user/findByNo | GET  | ?no=…                                             | Used to query information in the user  table based on user accounts. |
| /user/del      | GET  | ?uid=…, iid=…, pid=…                              | For account cancellation                                     |
| /user/update   | POST | {  “id”: …  “no”: …,  “password”: …,  “role”:…  } | Used to update user information in the  user table.          |

## 2-3 Info

| Interfaces        | Type | Argument                                                     | Comment                                                      |
| :---------------- | :--- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| /info/findByNo    | GET  | ?no=…                                                        | Used to query information in the info  table.                |
| /info/update      | POST | {  “id”: …, “no”: …, “name”: …, “phone”: …, “email”: …, “description”: …, “role”: …, “target”: …, “image”: … } | Used to update user information in the  info table.          |
| /info/pagingQuery | POST | {  “pageSize”: …, “pageNum”: …, “params”: { “name”: …, “role”: …, “target”: …}} | Query information in the info table on a  paging basis. The query criteria that can be passed are “name”, “role” and  “target”. |
| /info/list        | GET  |                                                              | Query all data in the info table                             |

## 2-4 Message

| Interfaces           | Type | Argument                                                     | Comment                                                      |
| -------------------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /message/add         | POST | {  “sender”: …, “receiver”: …, “comment”: …, “status”: …, “target”: …  } | Used to send a message requesting the  establishment of a connection. |
| /message/del         | GET  | ?id=…                                                        | Used to delete message                                       |
| /message/update      | POST | {  “id”: …,  “sender”: …,  “receiver”: …,  “comment”: …,  “status”: …,  “target”: …  } | Used to update the status of messages.                       |
| /message/pagingQuery | POST | {  “pageSize”: …, “pageNum”: …, “params”: {  “sender”: …, “receiver”: …, “status”: …, “target”: … }} | Used for paging query by condition in the  message table     |
| /message/list        | GET  |                                                              | Query all data in the message table                          |

## 2-5 Point

| Interfaces      | Type | Argument                                                     | Comment                                                      |
| --------------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /point/findByNo | GET  | ?no=…                                                        | Used to query information in the point  table by user account. |
| /point/update   | POST | {  “id”: …,  “no”: …,  “role”: …,  “success”: …,  “points”: …  } | Used to update the point information of  user.               |
| /point/rank     | GET  |                                                              | Get the top 10 sponsors based on the  number of successful connections. |
| /point/list     | GET  |                                                              | Query all data in the point table                            |

## 2-6 Target

| Interfaces     | Type | Argument                                            | Comment                            |
| -------------- | ---- | --------------------------------------------------- | ---------------------------------- |
| /target/add    | POST | {  “code”: …,  “type”: …,  “remark”: …  }           | Adding target information.         |
| /target/del    | GET  | ?id=…                                               | Deleting target information        |
| /target/update | POST | {  “id”: …,  “code”: …,  “type”: …,  “remark”: …  } | Updating target information        |
| /target/list   | GET  |                                                     | Query all data in the target table |

## 2-7 Reward

| Interfaces          | Type | Argument                                                     | Comment                                                      |
| ------------------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /reward/add         | POST | {  “name”: …,  “point”: …,  “store”: …,  “image”: …  }       | Adding reward information.                                   |
| /reward/del         | GET  | ?id=…                                                        | Deleting reward information                                  |
| /reward/update      | POST | {  “id”: …,  “name”: …,  “point”: …,  “store”: …,  “image”: …  } | Updating reward information                                  |
| /reward/pagingQuery | POST | {  “pageSize”: …,  “pageNum”: …,  “params”: {  “name”: …  }  } | Paging query in the reward table based on  “name” and the results are sorted in ascending order of “point” and  descending order of “store”. |
| /reward/findByName  | GET  | ?name=…                                                      | Search the reward table according to the name  of prize.     |
| /reward/list        | GET  |                                                              | Query all data in the reward table                           |

## 2-8 Record

| Interfaces          | Type | Argument                                                     | Comment                                                      |
| ------------------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /reward/add         | POST | {  “no”: …,  “prize”: …,  “count”: …,  “time”: …  }          | Adding record information.                                   |
| /reward/pagingQuery | POST | {  “pageSize”: …,  “pageNum”: …,  “params”: {  “no”: …  }  } | Paging query in the record table based on  “no” (Account number) |
| /reward/list        | GET  |                                                              | Query all data in the record table                           |
