# Heroku Deployment steps
- https://devcenter.heroku.com/categories/deploying-with-docker
- https://devcenter.heroku.com/articles/build-docker-images-heroku-yml

## Installing Heroku CLI
https://devcenter.heroku.com/articles/heroku-cli

## Change deploy mode to container
- ``` heroku login ```
- ```heroku stack:set container ``` 

## Setting up local repo with:
+ JAR file (kvestado.jar), Dockerfile, heroku.yml
- ``` cd kvestado-project/ ```
- Both Dockerfile and heroku.yml files to be copied into the folder (kvestado-project), as well as the created jar file.

- ``` git init ```
- ``` heroku git:remote -a kvestado ```

- ``` git config user.name "Adnan" ```
- ``` git config user.email "a@a.com" ```

- ``` git add . ```
- ``` git commit -am "initial" ```
- ``` git push heroku master ```

## Show server log
- ``` heroku logs --tail ```
- ``` heroku logs --tail --app kvestado ```



