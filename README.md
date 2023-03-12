# Node simple application

This is a simple node application. It will connect to a database, and show a page with a form to submit data to be saved on the database.

Its indended to just be used for learning load balancing because when you have many instances of this application, whenever a page is shown it will show which server is responding to the request.

i.e Lets say you have 3 instances of the application, like 3 kubernetes pods with a load balancer infront of the instances.

1. When a request comes to load balancer, it can be sent to any of the kubernetes pods
2. When a response is received, the page will show which pod served the request
3. Each time a record is saved in the database, you can see which server saved the request.

![Application Running](https://raw.githubusercontent.com/gathecageorge/node-names-application/main/app.png)

## Running application locally

1. Clone the repo
2. Run `npm install`
3. Copy .env_template to .env `cp .env_template .env`
4. Edit `.env` as required with application port, database host, username, password, database name
5. Run `node server.js`
6. Use dbpostgres.yml file with docker compose to create a database for testing `docker-compose -f dbpostgres.yml up -d`
6. Open `localhost:APPLICATION_PORT` to see the application

## Running using docker
1. Use command below. Replace environment variables as required.
    ```bash
    docker run --rm -d --add-host=host.docker.internal:host-gateway --name node-app -p 3001:3001 -e DATABASE_PORT=5432 -e APPLICATION_PORT=3001 -e DATABASE_HOST=host.docker.internal -e DATABASE_USER=postgres -e DATABASE_PASSWORD=example -e DATABASE_NAME=nodeNamesApplication gathecageorge/node-names-application:latest
    ```
2. Open `localhost:APPLICATION_PORT` to see the application

## Running using docker compose
1. Use command below. `DATABASE_HOST` variable wont be used, instead the compose stack will contain adminer, postgresdb, application 3 instances, nginx load balancer.
    ```bash
    docker-compose up -d
    ```
2. Open `localhost:APPLICATION_PORT` to see the application. By default 3 replicas of the application are started. Nginx reverse proxy is used to load balance requests to the replicas meaning each time you refresh a page, the request can go to any host and thus visualize the host serving the request.

## Running using kubernetes
1. Use command below. The application will have its own postgres server also started so no configuration needed. Incase you need to point to another postgres server, edit `kubernetes.yml` file accordingly.
    ```bash
    kubectl apply -f kubernetes.yml
    ```
2. Open `localhost:30001` to see the application. By default 2 replicas of the application are started. Kubernetes service is used to load balance requests to the replicas meaning each time you refresh a page, the request can go to any host and thus visualize the host serving the request.
3. Open `localhost:30002` to see adminer for connecting to postgres.

