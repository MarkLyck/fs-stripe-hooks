const getUserByStripeCustomer = require("../getUser");
const updateUser = require("../updateUser");

Date.prototype.unix = function() {
  return (this.getTime() / 1000) | 0;
};

const subscriptionHook = async subscription => {
  console.log("subscription", subscription);
  const { customer, trial_end, canceled_at, current_period_end } = subscription;

  // make sure it's a valid subscription and it has a customer on it.
  if (customer) {
    const user = await getUserByStripeCustomer(customer);

    let userType = "subscriber";
    if (trial_end > new Date().unix()) userType = "trial";

    if (canceled_at !== null && current_period_end < new Date().unix()) {
      userType = "canceling";
    } else if (canceled_at !== null && current_period_end > new Date().unix()) {
      userType = "canceled";
    }

    updateUser(user.id, subscription, userType);
  }
};

module.exports = subscriptionHook;
