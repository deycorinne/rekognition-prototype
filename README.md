# Rekognition Prototype 

The general idea of this project is to be able to upload a video to AWS Rekognition, extract the Video Analysis json, and then add our own drawings to the video based off of the people data AWS Rekognition has provided us. The end result will hopfully be a copy of the original video with the faces of different people marked by colored squares.


## Run the App

Example .env file:


    S3_BUCKET="TEST"
    AWS_KEY_ID="TEST"
    AWS_SECRET_ACCESS_KEY="TEST"
    ROLE_ARN="TEST"
    SNS_TOPIC_ARN="TEST"


`npm start`

