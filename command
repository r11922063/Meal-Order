# Build mysql service image
# in ./MySQL_docker
docker build -t meal-order-mysql . --no-cache

# Build backend service image
# in ./backend
docker build -t meal-order-backend . --no-cache

# Build backend service image
# in ./frontend2
docker build -t meal-order-frontend . --no-cache

# create and start all the services
docker compose up