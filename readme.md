<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

Project to check meters of WATER and GAS using Gemini Vision API

## Start Docker Compose 
```bash
$ docker compose up
```

## Using the project
First of all, to check the meters you need to create a "customer" to have a "customer_uuid", you can get one by making a POST request to http://localhost:4000/customer, with your "customer_uuid" now you can send meter images to the path http://localhost:4000/upload to be analyzed.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
