# digger

a database digging machine

## installation

	$ npm install digger -g

## usage

navigate to a folder that contains a digger.yml file and:

	sudo digger serve

will bring up the stack on port 80

test

## example digger.yaml

```yaml

##############################################
# the digger database setup
digger:
  ##############################################
  # this lets us access the data in the xml files
  /config:
    type: static
    config:
      folder: <%- path('xml/config') %>
  ##############################################
  # the users warehouse used by the website auth
  /users/buildright:
    access: private
    type: mongo
    config:
      database: buildright
      collection: users
  ##############################################
  # the admin users warehouse - this is in a static file
  # we are in a private repo so this is ok
  /users/admin:
    access: private
    type: static
    config:
      file: <%- path('xml/admin/users.xml') %>
  ##############################################
  # the projects warehouse for buildright projects
  /project:
    access: private
    type: mongo
    config:
      database: buildright
      provision: collection

##############################################
# the buildright app
buildright_www:
  # the folder with the static HTML
  document_root: www
  # where to mount our digger api
  digger: /api/v1
  auth:
    # where to mount our authentication
    url: /auth
    # what backend digger warehouse will save our users
    warehouse: /users/buildright
    events:
      # the module to run when a user has registered
      register: <%- path('modules/user_register.js') %>
  domains:
    - "buildright.digger.io"
    - "buildright.local.digger.io"

```


## running an application

change to the folder in which your digger.yaml file is located and type:

  $ digger run

this will do the following:

 * scan the digger.yaml file to build up a map of the stack services

 * scan the .digger folder in the app to check if services are already running

 * start any of the services that are not running

## stack state folder

each application's codebase (which is built on the master quarry server)
will container a .digger folder - this represents the current status of that stack

this folder is never committed with git

in this folder is:

### env
a folder containing named files - each one representing an environment setting for the stack

each file can be lowercase or uppercase - it will be converted to uppercase before written into the env for the stack

the contents of each file is the value of the variable within the stack

    DIGGER_STACK_ID               - id generated by the build process
    DIGGER_DEPLOYMENT_ID          - incrementing number for each time we deploy
    DIGGER_STACK_ROOT             - the folder in which the code for the application lives
    DIGGER_DB_MONGO_HOST          - what hostname our mongo lives on
    DIGGER_DB_MONGO_PORT          - what port our mongo lives on
    DIGGER_DB_MONGO_URL           - a complete url for the mongo
    DIGGER_DB_MONGO_LOGIN         - the username for the mongo server
    DIGGER_DB_MONGO_PASSWORD      - the password for the mongo server
    DIGGER_DB_REDIS_HOST          - what hostname our redis lives on
    DIGGER_DB_REDIS_PORT          - what port our redis lives on
    DIGGER_DB_REDIS_PASSWORD      - the password for the redis server

### pids
a folder containing the docker info for each of the currently running services and nodes

each folder represents the service or node name

inside each of these are the folders for each container running that service / node

apps and warehouses are prepended with app_ or warehouse_

  mongo
    3443589
  redis
    3084308
  hq
    3489383
  reception
    9389383
  app_my_www
    30933383
    39083983
  warehouse_my_path
    34r3434

the above shows a network with 1 of everything apart from the front facing app which has 2

### data

the data folder that keeps the database and file uploads

we mount volumes into the docker containers for these so the apps do not know the difference


### logs

the folder we pipe the logs for each service into

## booting a stack

the first job of the stack is to build out the services so we can populate the environment of
the running nodes

there are 2 loaders in play:

 * developer
 * quarry

### developer
this loader will boot the services as normal

it will then create a developer container that is running the stack from the current folder

### quarry
this loader will boot the services and then

