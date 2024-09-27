This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# ubuntu-awscli-installation

-> First need to download the awscli file
link: https://aws.amazon.com/cli/
-> Afrer downloading the file, install it.
-> after that open the cmd and check the version-> aws --version
result : aws-cli/2.17.59 Python/3.12.6 Windows/11 exe/AMD64

-> after that create the IAM user, in AWS
-> IAM -> create -> enter name (thats it) -> click next -> attach policy directly -> give the adminstrator access -> next button -> Review and create
-> After creating the user, need to add the security credentials -> click on the user -> security credentials -> go to Access keys -> cli + authenticate -> create -> click on the create -> copy/download the keys

-----------------------------------**************\*\***************-------------------------------

# Docker setup in the ubuntu instance

1. if you want to use the aws console, first need to install the docker
   -> sudo apt-get update && sudo apt-get install docker.io -y && sudo systemctl start docker
2. try to run the command -> docker ps -> will throw an error, like permission error
   -> sudo chmod 666 /var/run/docker.sock
3. check the docker ps and docker --version
   -> docker ps
   -> docker --version

# Docker setup in the runner for ubuntu

1. Open the github and runners
2. run the below commands one by one
   -> mkdir actions-runner && cd actions-runner
   -> curl -o actions-runner-linux-x64-2.319.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.319.1/actions-runner-linux-x64-2.319.1.tar.gz
   -> echo "3f6efb7488a183e291fc2c62876e14c9ee732864173734facc85a1bfb1744464 actions-runner-linux-x64-2.319.1.tar.gz" | shasum -a 256 -c
   -> tar xzf ./actions-runner-linux-x64-2.319.1.tar.gz
   -> ./config.sh --url https://github.com/maheshyadav7702/next-server --token AJWUYH2QDI2QEOBBQBKSWG3G6YWPQ

3. After run the last command, it will connect to the github Actions
4. follow the below steps to configure the setup
   -> Enter the name of the runner group -> keep it as default, just enter
   -> Enter the name of the runner -> ec2 (you can give any name)
   -> Enter any additional label -> Enter for skip
   -> Enter name of work folder -> Enter for default, Enter
   -> FInally setting saved.
5. To keep the runner always follow the below steps:
   -> sudo ./svc.sh install
   -> sudo ./svc.sh start

6. In the docker editor file
   -> vim filename
7. for exit
   -> :wq! + enter
8. for list
   -> ls

# Docker build -> image -> containerization and run the applicaiton on the web

1. to build the img
   -> docker built -t project-image
   a). -t is tag
   b). docker build is built command
   c). project-image is image name
2. docker images list
   -> docker images
3. to run the images
   -> docker run -d -p 80:80 --name project-container project-image
4. then container has been created
5. to know the containers
   -> docker ps
6. then copy the public ip and check the application

# ECR -> create

1. visibility setting -> private
2. repository name -> my-repository
3. create the ecr repository
4. after creating the ecr repo, select repo and click on the Push commands for repo button, there you can see the commands to push the code to repo.
   than you have add in the aws.yml file under the workflow folder.

#application load balance

1. create button-> application load balance -> create
2. scheme -> internet facing
3. keep the default vpc
4. availability zone select , 1a,1b,1c zones
5. security group, select -> created and added with ssh and https
6. Listeners and routing -> need to create the target group -> click on the target group button -> Advanced health check settings (changed to 2) -> then click on the create target group button and select this target group, while creating the load balancer and click on the create load balancer.

# To create ECS

Elastic Container Service is a Docker container service, it is easy to run stop and manage containers on a cluster.

1.First need to create the task definition
-> it is blueprint that describes how a docker container should lunch.
-> create click on "create new task definition" option from the dropdown 2. Task definition family -> name 3. Container-> name and Image URI -> copy from the ECR repo URI 4. Given port name 5.
a). Need to add the Task execution role -> click on the iam service -> roles -> click on the create new role -> AWS service, then Use case (select the Elastic Container Service), after selecting the option, then select the Elastic Container Service Task radio option.
b). In the next step, select the amazonEcsTaskExecutionRolePolicy, click next and give the role name -> then click on the create role

-> then add this role, in the field of task execution role field. 6. then click on the next. 7. then click on the create button. and now task definition is created.

#After creating the Task definition, need to create the ECS cluster.
ECS cluster is not involved a logical grouping of tasks or services so your tasks and services are run on infrastructure that are registered to a cluster.

1. click on the create button to create the cluster.
   -> give the name and click on the create

#After creating the Cluster need to create the Service in ECS
services allows you to run and maintain a specified number of instances a tax definition concurrently in an amazon ECS cluster.

1. click on the cluster and select the Service tab and click on the create.
   -> Compute configuration (advanced) -> Capacity provider strategy
   -> select the Task definition, which you have created.
   -> give the Service name.
   -> Desired tasks changed it to 2.
   -> Security groyp- selcted exsting one
   -> Subnets -> select 3
   -> load balancer-> use exsting load balancer.
   -> conatine -> existing load balance container
2. click on the create
3. then check the all tabs and take the DNS link from the Networking tab, and check on the browser.
