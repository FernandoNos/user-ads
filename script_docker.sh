# docker container stop $(sudo docker container ls -aq) && sudo docker system prune -af --volumes
sudo docker build -t ads-api:v1      ./ads-api
sudo docker build -t security-api:v1 ./security-api
#docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker-compose build
docker-compose up

#sudo docker run -ti -p 27017:27017 --rm mongo --bind_ip 0.0.0.0
