sudo docker build -t ads-api:v1 ./ads-api
#docker container stop $(sudo docker container ls -aq) && sudo docker system prune -af --volumes
#docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker-compose build
docker-compose up

