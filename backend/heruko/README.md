# Heroku Deployment steps
https://devcenter.heroku.com/articles/build-docker-images-heroku-yml

## Installing Heroku CLI
https://devcenter.heroku.com/articles/heroku-cli

## Change deploy mode to container
- ```bash heroku login ```
- ```heroku stack:set container ``` 

## Setting up local repo with:
+ JAR file (kvestado.jar), Dockerfile, heroku.yml
- ```bash cd kvestado-project/ ```
- ```bash git init ```
- ```bash heroku git:remote -a kvestado ```

- ```bash git config user.name "Adnan" ```
- ```bash git config user.email "a@a.com" ```

- ```bash git add . ```
- ```bash git commit -am "initial" ```
- ```bash git push heroku master ```

## Show server log
- ```bash heroku logs --tail ```



