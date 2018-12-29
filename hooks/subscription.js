const getUserByStripeCustomer = require("../getUser");
const updateUser = require("../updateUser");

Date.prototype.unix = function() {
  return (this.getTime() / 1000) | 0;
};

const subscriptionHook = await subscription => {
  console.log("subscription", subscription);
  if (subscription.customer) {
    // make sure it's a valid subscription and it has a customer on it.
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
};

module.exports = subscriptionHook;
