# quickstep-backend
Real-time live location tracking in Flutter - Backend server
### Known issues
- User profile picture expires after 1 week as we're using S3 bucket services to store our images, which expires the signedUrl of the file from the S3 bucket after a certain period of time.
Message: `Signature version 4 presigned URLs must have an expiration date less than one week in the future`