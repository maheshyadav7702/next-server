import React from "react";
import { Container, Grid, Typography } from "@mui/material";

const EcrFlow = () => {
  const resources = [
    "EC2",
    "Docker",
    "ECR",
    "ECS",
    "FARGATE",
    "Application Load Balancer",
  ];
  return (
    <Container>
      <Grid mt={4}>
        <h3>Resources Covered</h3>
        <ul>
          {resources?.map((resource, index) => (
            <Typography key={resource}>{resource}</Typography>
          ))}
        </ul>
      </Grid>

      <Grid mt={4}>
        <h3>Flow of Execution</h3>

        <Grid fontWeight="bold" mt={2}>
          Step1:
        </Grid>
        <ol>
          <Typography>Launch an EC2 instance</Typography>
          <Typography>Install Docker in EC2 instance</Typography>
          <Typography>Build a Docker image</Typography>
          <Typography>Push the Docker image to ECR</Typography>
          <Typography>Create an ECS cluster</Typography>
          <Typography>Create a FARGATE service</Typography>
          <Typography>Configure Application Load Balancer</Typography>
        </ol>

        <Grid fontWeight="bold" mt={2}>
          Step2:
        </Grid>
        <ol>
          <Typography>Create the ECR</Typography>
          <Typography>Login to the ECR</Typography>
          <Typography>Tag existing image as AWS ECR repo</Typography>
          <Typography>Push image into ECR</Typography>
        </ol>

        <Grid fontWeight="bold" mt={2}>
          Step3:
        </Grid>
        <ol>
          <Typography>Creating the Application Load Balancer</Typography>
        </ol>

        <Grid fontWeight="bold" mt={2}>
          Step4:
        </Grid>
        <ol>
          <Typography>
            Creating task Definition | Create AWS ECS cluster | Create Service
          </Typography>
        </ol>

        <Grid fontWeight="bold" mt={2}>
          Step5:
        </Grid>
        <ol>
          <Typography>Validation</Typography>
        </ol>
      </Grid>
    </Container>
  );
};

export default EcrFlow;
