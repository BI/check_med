# CheckMed [![Circle CI](https://circleci.com/gh/BI/octo-wookie.svg?style=svg)](https://circleci.com/gh/BI/octo-wookie)

##Installing and Running the CheckMed Application
Prerequisites:
Ensure that you have Docker  installed on your machine.  Here is some information incase you need to install it:  https://docs.docker.com/compose/install/

There are two ways to run the application.  You can pull down the docker image and run it, or, you can clone the github repository and create the docker image locally.

### Running the Prebuilt Docker Image
`docker run -d --net host -e RAILS_ENV=production -e SECRET_KEY_BASE=<insert a key> -e NODE_ENV=production barquin/octo-wookie:latest`

####Additional Notes about Running the Prebuilt Docker Image

1) in some installations, docker must be run with root privileges.  So just run it with sudo:
`sudo docker run -d --net host -e RAILS_ENV=production -e SECRET_KEY_BASE=<insert a key> -e NODE_ENV=production barquin/octo-wookie:latest`
2) Where it says <insert a key> in the command above, just replace it with a random alphanumeric string up to 128 characters long.

Running it this way will expose the application on port 80 of the machine you are running.  To access the application, then you can use your browser to connect to port 80.  For example: http://localhost

### Build and Run Locally
Clone this git repository.
    
    cd octo-wookie
    docker build -t local/octo-wookie .
    docker run -d --net host -e RAILS_ENV=production -e SECRET_KEY_BASE=<insert a key, alphanumeric upto 128 characters> -e NODE_ENV=production local/octo-wookie

Running it this way will expose the application on port 80 of the machine you are running.  To access the application, then you can use your browser to connect to port 80.  For example: http://localhost

## Running Unit Tests

To run the unit tests, please do the following:
Clone this git repository (if you already have not).
    
    cd octo-wookie
    docker build -t local/octo-wookie .
    docker run local/octo-wookie npm test

##Deployment and Workflow

* The `prerelease` branch is **automatically deployed** to our [prerelease site](https://ads_bpa_rfq_test.barquinlab.com/).
* The `release` branch is **automatically deployed** to our [production site](https://ads_bpa_rfq.barquinlab.com/).

**All development and pull requests should be done against the `prerelease` branch.**

Deployments to production will be done by administrators, using pull requests from `prerelease` to `release`.

##Continuous Integration and Continuous Deployment Specification

###Tools used for Continuous Integration and Continuous Deployment:
* git & github https://github.com/BI/octo-wookie
* circle-ci.com  https://circleci.com/gh/BI/octo-wookie
* Docker Registry - https://registry.hub.docker.com/u/barquin/octo-wookie  
* Amazon Web Services (AWS) Elastic Beanstalk

###Hosting Information
* The site is hosted on AWS Elastic Beanstalk



### Prerelease Environment 
git: https://github.com/BI/octo-wookie/tree/prerelease

#### Build and Test
1. Push commit to github [BI/octo-wookie#prerelease] -> triggers CircleCI build which does the following (https://circleci.com/gh/BI/octo-wookie):
2. Builds docker container based on Dockerfile https://github.com/BI/octo-wookie/blob/prerelease/Dockerfile which setups docker container and deploys application to it.
3. Verifies that the application can run and connects to port 80
4. Runs all autotests and verifies that they all completed successfully. 

#### Deployment
1. If the build is successful and all tests have passed, the docker image is uploaded to Docker Hub (https://registry.hub.docker.com/u/barquin/octo-wookie/) with the image tagged with the current git commit id.
2. The Dockerrun.aws.json file is uploaded to the Amazon Elastic Beanstalk test environment (http://ads_bpa_rfq_test.barquinlab.com/) which then pulls down from Docker Hub the docker image and deploys it. To view the commands used, look at the circle.yml and deploy.sh scripts.

### Production Environment
git: https://github.com/BI/octo-wookie/tree/release

#### Build and Test
1. Push commit to github [BI/octo-wookie#release] -> triggers CircleCI build which does the following:
2. Builds docker container based on Dockerfile https://github.com/BI/octo-wookie/blob/release/Dockerfile which setups docker container and deploys application to it.
3. Verifies that the application can run and connects to port 80
4. Runs all autotests and verifies that they all completed successfully.

#### Deployment
1. If the build is successful and all tests have passed, the docker image is uploaded to Docker Hub (https://registry.hub.docker.com/u/barquin/octo-wookie/) with the image tagged with the current git commit id.
2. The Dockerrun.aws.json file is uploaded to the Amazon Elastic Beanstalk production environment (http://ads_bpa_rfq.barquinlab.com/) which then pulls down from Docker Hub the docker image and deploys it. To view the commands used, look at the circle.yml and deploy.sh scripts.
