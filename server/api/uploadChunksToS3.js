const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const BUCKET_NAME = process.env.REACT_APP_S3_BUCKET;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

const s3Endpoint = new AWS.Endpoint("https://s3.us-west-2.amazonaws.com");

const s3Credentials = new AWS.Credentials({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  endpoint: s3Endpoint,
  credentials: s3Credentials,
});

// INITIALIZE MULTIPART UPLOAD
router.post("/initializeMultipartUpload", async function (req, res) {
  try {
    const { name } = req.body;
    const multipartParams = {
      Bucket: BUCKET_NAME,
      Key: name,
      ACL: "public-read",
    };

    const multipartUpload = await s3
      .createMultipartUpload(multipartParams)
      .promise();

    res.send({
      fileId: multipartUpload.UploadId,
      fileKey: multipartUpload.Key,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to initialize multipart upload" });
  }
});

// GET PRESIGNED URLS
router.post("/getMultipartPreSignedUrls", async function (req, res) {
  try {
    const { fileKey, fileId, parts } = req.body;

    const multipartParams = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      UploadId: fileId,
    };

    const promises = [];

    for (let index = 0; index < parts; index++) {
      promises.push(
        s3.getSignedUrlPromise("uploadPart", {
          ...multipartParams,
          PartNumber: index + 1,
        })
      );
    }

    const signedUrls = await Promise.all(promises);

    // assign to each URL the index of the part to which it corresponds
    const partSignedUrlList = signedUrls.map((signedUrl, index) => {
      return {
        signedUrl: signedUrl,
        PartNumber: index + 1,
      };
    });

    res.send({
      parts: partSignedUrlList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to get pre-signed URLs" });
  }
});

// FINALIZE MULTIPART UPLOAD
router.post("/finalizeMultipartUpload", async function (req, res) {
  try {
    const { fileId, fileKey, parts } = req.body;

    const multipartParams = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      UploadId: fileId,
      MultipartUpload: {
        // ordering the parts to make sure they are in the right order
        Parts: _.orderBy(parts, ["PartNumber"], ["asc"]),
      },
    };

    const completeMultipartUploadOutput = await s3
      .completeMultipartUpload(multipartParams)
      .promise();

    // completeMultipartUploadOutput.Location represents the
    // URL to the resource just uploaded to the cloud storage
    console.log(
      "completeMultipartUploadOutput.Location",
      completeMultipartUploadOutput.Location
    );
    res.send({ url: completeMultipartUploadOutput.Location });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to finalize multipart upload" });
  }
});

module.exports = router;
