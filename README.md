[![codebeat badge](https://codebeat.co/badges/d6168224-7ab8-4ee3-9ce0-767c8940ff46)](https://codebeat.co/projects/github-com-thomasmeadows-uber-api-exmaple-app-master)

# uber-api-exmaple-app

Uber API Example with Express, Mongo, and EJS

### Installing and working with the app locally

1) Install docker and docker-compose if not already installed

2) Signup for uber, get uber client id, secret, and server id.

3) copy .example.env to .env and replace all environment variables with the ones retreived from uber's developer page.

4) run

```bash
  docker-compose run uber-api bash
```

    then run this in container

```bash
npm install; exit;
```

5) run docker-compose up
