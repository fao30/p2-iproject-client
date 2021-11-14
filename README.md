# p2-iproject-server

Individual Project - Server

sequelize model:generate --name Account --attributes name:string,address:string,telephone:string

sequelize model:generate --name User --attributes name:string,email:string,password:string,role:string,AccountId:integer

sequelize model:generate --name TourPackage --attributes destinationName:string,availableSeat:string,price:integer,temperature:integer

sequelize model:generate --name BookTrip --attributes TourPackageId:integer,UserId:integer

sequelize seed:generate --name seed-accounts
sequelize seed:generate --name seed-TourPackage
sequelize seed:generate --name seed-user
sequelize seed:generate --name seed-bookTrip
