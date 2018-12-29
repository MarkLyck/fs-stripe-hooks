const express = require("express");
const app = express();

const getUserByStripeCustomer = require("./getUser");
const updateUser = require("./updateUser");

Date.prototype.unix = function() {
  return (this.getTime() / 1000) | 0;
};

app.use(require("body-parser").raw({ type: "*/*" }));
app.post("/subscription", async (req, res) => {
  res.status(200);
  res.send("received stripe hook request");
  res.end();

  const subscription = JSON.parse(req.body);
  console.log("event", subscription);
  if (subscription.customer) { // make sure it's a subscription and it has a customer on it.
    const user = await getUserByStripeCustomer(subscription.customer);

    let userType = "subscriber";
    if (subscription.trial_end > new Date().unix()) userType = "trial";

    if (
      subscription.canceled_at !== null &&
      current_period_end < new Date().unix()
    ) {
      userType = "canceling";
    } else if (
      subscription.canceled_at !== null &&
      current_period_end > new Date().unix()
    ) {
      userType = "canceled";
    }

    updateUser(user.id, subscription, userType);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("app listening on port: ", port));

module.exports = app;
