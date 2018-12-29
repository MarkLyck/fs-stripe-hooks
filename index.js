const express = require("express");
const app = express();
const subscriptionHook = require("./hooks/subscription");

app.use(require("body-parser").raw({ type: "*/*" }));
app.post("/", async (req, res) => {
  res.status(200); // respond with 200 OK for Stripe to work.
  res.end();

  const event = JSON.parse(req.body);
  // stripe event looks something like this:
  /*
    {
      id: 'evt_1DmfEzEyFfkw1MXRz6VcNDo6',
      object: 'event',
      api_version: '2018-11-08',
      created: 1546080024,
      data: {
        object: { >>> DATA YOU WANT <<< }
        previous_attributes: {...}
      },
      livemode: true,
      pending_webhooks: 1,
      request: { id: 'req_kGg9wGwg28TiXc', idempotency_key: null },
      type: 'customer.subscription.updated'
    }
  */

  if (event.type === "customer.subscription.updated") {
    subscriptionHook(event.data.object);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("app listening on port: ", port));

module.exports = app;
