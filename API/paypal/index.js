// import { apiStatus } from '../../../lib/util';
import { Router } from 'express';
import { getCurrentStoreView, getCurrentStoreCode } from '../../../lib/util';
// const Magento2Client = require('magento2-rest-client').Magento2Client

// 1a. Import the SDK package
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const paypalClient = require('./paypal-client');

module.exports = ({ config, db }) => {

  let api = Router();

  api.post('/complete', async (req, res) => {
    // const client = Magento2Client(config.magento2.api);

    // 2a. Get the order ID from the request body
    const orderId = req.body.orderId;

    // 3. Call PayPal to get the transaction details
    let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

    let order;
    try {
      const storeView = getCurrentStoreView(getCurrentStoreCode(req))
      const clientId = config.extensions.paypal[`clientId_${storeView.i18n.currencyCode}`] || config.extensions.paypal.clientId
      const clientSecret = config.extensions.paypal[`secret_${storeView.i18n.currencyCode}`] || config.extensions.paypal.secret
      const env = config.extensions.paypal.env
      order = await paypalClient.client({ env, clientId, clientSecret }).execute(request);
    } catch (err) {

      // 4. Handle any errors from the call
      console.error(err);
      return res.sendStatus(500);
    }

    // 5. Validate the transaction details are as expected
    // if (order.result.purchase_units[0].amount.value !== '220.00') {
    //   return res.sendStatus(400);
    // }

    // 6. Save the transaction in your database
    // await database.saveTransaction(orderID);

    // 7. Return a successful response to the client
    res.json({ status: 'success', order: order ? order : null });

  })

  return api
}
