import connectMongo from "../../config/connectMongo";
// import RewardsModel from "../../models/rewards-schema";
// const s3 = require('s3');

// const bucketName = process.env.AWS_S3_BUCKET;
// const region = "us-east-1";
// const accessKey = "AKIAWGCNUVFUIBCCHBBL";
// const secretKey = "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";

// const aws = require("aws-sdk"),
//   bodyParser = require("body-parser"),
//   multer = require("multer"),
//   multerS3 = require("multer-s3");

// aws.config.update({
//   secretAccessKey: secretKey,
//   accessKeyId: accessKey,
//   region: region,
// });

// var client = s3.createClient({
//   maxAsyncS3: 20,     // this is the default
//   s3RetryCount: 3,    // this is the default
//   s3RetryDelay: 1000, // this is the default
//   multipartUploadThreshold: 20971520, // this is the default (20 MB)
//   multipartUploadSize: 15728640, // this is the default (15 MB)
//   s3Options: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretKey,
//     // any other options are passed to new AWS.S3()
//     // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
//   },
// });

// const adminAddress = ["0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB"];

const createReward = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  connectMongo();

  // const awsUpload = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     acl: "public-read",
  //     bucket: "cubexbucket",
  //     key: function (req, file, cb) {
  //       console.log(file);
  //       cb(null, file.originalname); //use Date.now() for unique file keys
  //     },
  //   }),
  // });
 

  const { title, detail, imageStr, eligibilityCount, typedData, signature } =
    req.body;

    console.log("Image File", req.body);

    // var params = {
    //   localFile: imageStr,
     
    //   s3Params: {
    //     Bucket: "cubexbucket",
    //     Key: "putObject",
    //     // other options supported by putObject, except Body and ContentLength.
    //     // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    //   },
    // };
    

  try {
    // const uploader = client.uploadFile(params);

    // uploader.on('error', function(err) {
    //   console.error("unable to upload:", err.stack);
    // });
    // uploader.on('progress', function() {
    //   console.log("progress", uploader.progressMd5Amount,
    //             uploader.progressAmount, uploader.progressTotal);
    // });
    // uploader.on('end', function() {
    //   console.log("done uploading");
    // });
    // const signer = recoverTypedSignature({
    //   data: typedData,
    //   signature: signature,
    //   version: SignTypedDataVersion.V4,
    // });

    // if (signer.toLowerCase() === adminAddress.map((el) => el.toLowerCase())) {
    //     console.log("Creating Proposal...")
    // } else {
    //   res
    //   .status(405)
    //   .send({ message: "This account is not allowed to initiate proposals" });
    // }

    // const newReward = await RewardsModel.create({
    //   title: title,
    //   detail: detail,
    //   image: imageStr,
    //   eligibilityCount: eligibilityCount,
    // }).then((data) => {
    //   return data;
    // });

    res.status(201).json({
      status: "success",
      data: {
        proposal: "Hello",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to create new reward",
      },
    });
  }
};

export default createReward;
