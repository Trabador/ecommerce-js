import React from "react";
import PurchaseDetails from "../../components/PurchaseDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./styles.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PB_KEY);

function Purchase() {
  return (
    <Elements stripe={stripePromise}>
      <PurchaseDetails />
    </Elements>
  );
}

export default Purchase;
