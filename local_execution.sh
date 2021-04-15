sudo docker build -t ads-api:v1      ./ads-api
sudo docker build -t security-api:v1 ./users-api
docker-compose build
docker-compose up

