# Api CRUD example with docker compose

## Variable environment
You have to change the variables or not

## DB
In the file /mysql/db.sql you have to connect for workbench and import the script. 

## Run
docker-compose up --build

## Remove images
docker-compose down --rmi all

## Fix issue -> ERROR [internal] load metadata 
 docker rm -f $(docker ps -a -q)