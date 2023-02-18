import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "us-east-2",
  accessKeyId: "AKIAWGCNUVFULT4P7HH4",
  secretAccessKey: "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",
});
// const adminAddress = ["0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB"];
// cli curl -i https://cubaclee.s3.us-east-2.amazonaws.com -H "Origin: http://localhost:3000

const uploadImage = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    let { name, type } = req.body;

    const fileParams = {
      Bucket: "cubacle",
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(201).json({
      status: "success",
      data: {
        data: url,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to upload image",
      },
    });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};

export default uploadImage;
