# About APP

This is a simple node application. It will connect to a database, and show a page with a form to submit data to be saved on the database.

Its indended to just be used for learning load balancing because when you have many instances of this application, whenever a page is shown it will show which server is responding to the request.

i.e Lets say you have 3 instances of the application, like 3 kubernetes pods with a load balancer infront of the instances.

1. When a request comes to load balancer, it can be sent to any of the kubernetes pods
2. When a response is received, the page will show which pod served the request
3. Each time a record is saved in the database, you can see which server saved the request.

![Application Running](https://raw.githubusercontent.com/gathecageorge/node-names-application/main/app.png)

# Supports dev container

Once opened run `node js/server.js`

## Running using docker
1. Use dbpostgres.yml file with docker compose to create a database for testing `docker-compose -f dbpostgres.yml up -d`
2. Use command below. Replace environment variables as required.
    ```bash
    docker run --rm -d --add-host=host.docker.internal:host-gateway --name node-app -p 3001:3001 -e DATABASE_PORT=5432 -e APPLICATION_PORT=3001 -e DATABASE_HOST=host.docker.internal -e DATABASE_USER=postgres -e DATABASE_PASSWORD=example -e DATABASE_NAME=nodeNamesApplication gathecageorge/node-names-application:latest
    ```
3. Open `localhost:APPLICATION_PORT` to see the application