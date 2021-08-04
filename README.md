# StudentCentral backend

## 1.0.1 

This release will contain the pushed application for one of the personal project of the author.
This project is submitted to PSU faculty along with the frontend code ( based on android). 

### Architecure

1. This backend is build using node.js 14, express and mongoose.
2. It is also supported by mongodb-community edition in the backend.
3. The project is containerized and orchestrated via docker-compose.
4. While the node API image is available in the public docker registry, docker-compose up from the local clonned repo folder is recommended.
5. The API can be further enhanced with newer Models for the Network Repository implementation of PSU.
6. It can be further integrated with Facebook SDK to tranform it into a social media app.
7. The mongodb server uses local network created from docker-compose. Please be careful with how you name your database.

### Deployment

1. The backend is deployed to a single AWS ec2-instance by an ASG and ELB.
2. The instance is equipped with docker, docker-compose, jenkins.
3. The repo is integrated with the pipeline via a webhook.
4. Any new code changes, will automatically trigger the pipeline and deploy any new changes to the application.

### Notes

The pipeline code is not provided here. But here is the mechanism.

1. It will be notified via the webhook of any changes.
2. cd into the project folder inside the ec2.
3. do a git pull.
4. docker-compose down to bring the existing containers down.
5. docker-compose up -d --build, to force the new image build.

