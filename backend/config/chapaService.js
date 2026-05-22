const https = require('https');
require('dotenv').config();

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(new Error("Failed to parse response"));
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

exports.initializePayment = async (paymentData) => {
  const postData = JSON.stringify(paymentData);

  const options = {
    hostname: 'api.chapa.co',
    path: '/v1/transaction/initialize',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  return await makeRequest(options, postData);
};

exports.verifyPayment = async (tx_ref) => {
  const options = {
    hostname: 'api.chapa.co',
    path: `/v1/transaction/verify/${tx_ref}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
    },
  };

  return await makeRequest(options);
};
