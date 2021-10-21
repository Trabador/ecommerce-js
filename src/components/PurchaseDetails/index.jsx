import Buttons from "../forms/Buttons";
import FormCustom from "../forms/FormCustom";
import FormInput from "../forms/FormInput";
import Errors from "../forms/Errors";
import useData, { TYPES } from "./useData";
import "./styles.scss";
import { CardElement, useStripe } from "@stripe/react-stripe-js";

const cardConfig = {
  iconStyle: "solid",
  style: {
    base: {
      fontSize: "25px",
    },
  },
  hidePostalCode: true,
};

function PurchaseDetails() {
  const stripe = useStripe();

  const [state, dispatchData, handleOnPaymentSubmit, errors, isProcessing] =
    useData();
  const { name, address, city, zipcode, phone } = state;

  return (
    <FormCustom headline="Shipment Data">
      <Errors errors={errors} />
      <form onSubmit={handleOnPaymentSubmit}>
        <FormInput
          type="text"
          label="Name"
          name="name"
          value={name}
          placeholder="Name"
          handleOnChange={(e) =>
            dispatchData({ action: TYPES.NAME, payload: e.target.value })
          }
        />
        <FormInput
          type="text"
          label="Address"
          name="address"
          value={address}
          placeholder="Address"
          handleOnChange={(e) =>
            dispatchData({ action: TYPES.ADDRESS, payload: e.target.value })
          }
        />
        <FormInput
          type="text"
          label="City"
          name="city"
          value={city}
          placeholder="City"
          handleOnChange={(e) =>
            dispatchData({ action: TYPES.CITY, payload: e.target.value })
          }
        />
        <FormInput
          type="text"
          label="Zip Code"
          name="zipcode"
          value={zipcode}
          placeholder="Zip code"
          handleOnChange={(e) =>
            dispatchData({ action: TYPES.ZIPCODE, payload: e.target.value })
          }
        />
        <FormInput
          type="text"
          label="Phone Number"
          name="phone"
          value={phone}
          placeholder="Phone number"
          handleOnChange={(e) =>
            dispatchData({ action: TYPES.PHONE, payload: e.target.value })
          }
        />
        <div className="card">
          <CardElement options={cardConfig} />
        </div>
        {isProcessing ? (
          <div className="processing">Processing</div>
        ) : (
          <Buttons type="submit" disabled={!stripe}>
            Finish Payment
          </Buttons>
        )}
      </form>
      <div className="disclosure">
        *This is for demonstration purpose only, please dont put real data
      </div>
    </FormCustom>
  );
}

export default PurchaseDetails;
