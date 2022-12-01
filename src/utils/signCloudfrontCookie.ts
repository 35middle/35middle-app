import AWS from 'aws-sdk';

const publicKey = process.env.CF_PUBLIC_KEY_ID || '';
const privateKey = process.env.CF_PRIVATE_KEY || '';

const expiry = 254360726300;

const policy = JSON.stringify({
  Statement: [
    {
      Resource: `${process.env.CF_URL}/*`,
      Condition: {
        DateLessThan: { 'AWS:EpochTime': expiry },
      },
    },
  ],
});

const signer = new AWS.CloudFront.Signer(publicKey, privateKey);

const signCloudfrontCookie = async (): Promise<{
  'CloudFront-Policy': string;
  'CloudFront-Key-Pair-Id': string;
  'CloudFront-Signature': string;
}> => {
  const options = {
    url: `${process.env.CF_URL}/*`,
    policy,
  };

  return new Promise((resolve, reject) => {
    signer.getSignedCookie(options, (err, cookie) => {
      if (err) {
        reject(err);
      } else {
        resolve(cookie);
      }
    });
  });
};

export default signCloudfrontCookie;
