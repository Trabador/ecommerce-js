import { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../../redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCartItemsTotalAmount } from "../../redux/Cart/cartSelectors";
import axios from "axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";

const initialState = {
  name: "",
  address: "",
  city: "",
  zipcode: "",
  phone: "",
};

export const TYPES = {
  NAME: "NAME",
  ADDRESS: "ADDRESS",
  CITY: "CITY",
  ZIPCODE: "ZIPCODE",
  PHONE: "PHONE",
  CLEAN_FORM: "CLEAN_FORM",
};

const reducer = (state, { action, payload }) => {
  switch (action) {
    case "NAME":
      return { ...state, name: payload };
    case "ADDRESS":
      return { ...state, address: payload };
    case "CITY":
      return { ...state, city: payload };
    case "ZIPCODE":
      return { ...state, zipcode: payload };
    case "PHONE":
      return { ...state, phone: payload };
    case "CLEAN":
      return initialState;
    default:
      return state;
  }
};

const mapState = createStructuredSelector({
  totalAmount: selectCartItemsTotalAmount,
});

const useData = () => {
  const elements = useElements();
  const [state, dispatchData] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState([]);
  const [isProcessing, setProcessing] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const history = useHistory();

  const { totalAmount } = useSelector(mapState);

  const stripe = useStripe();

  const resetForm = () => {
    dispatchData({ action: TYPES.CLEAN_FORM });
  };

  const isEmpty = (data) => {
    if (data === "") return true;
    if (data === null) return true;
    if (data === undefined) return true;
    return false;
  };

  const validateFormData = () => {
    if (
      isEmpty(state.name) ||
      isEmpty(state.address) ||
      isEmpty(state.city) ||
      isEmpty(state.zipcode) ||
      isEmpty(state.phone)
    ) {
      setErrors(["* All fields are mandatory"]);
      return false;
    }
    return true;
  };

  const makePaymentIntet = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL, {
        amount: totalAmount * 100,
        shipping: {
          name: state.name,
          address: {
            city: state.city,
            line1: state.address,
            postal_code: state.zipcode,
          },
        },
      });

      const { data: clientSecret } = response;
      return clientSecret;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const createPayment = async (cardElement) => {
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: state.name,
          address: {
            city: state.city,
            line1: state.address,
            postal_code: state.zipcode,
          },
        },
      });

      return paymentMethod;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const confirmPayment = (clientSecret, paymentId) => {
    try {
      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: paymentId,
        })
        .then(({ paymentIntent }) => {
          if (paymentIntent) {
            setProcessing(false);
            dispatch(emptyCart({ userId: currentUser.id }));
            resetForm();
            history.push("/finish");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  const handleOnPaymentSubmit = async (e) => {
    const cardElement = elements.getElement(CardElement);
    setProcessing(true);
    e.preventDefault();
    if (!validateFormData()) {
      setProcessing(false);
      return;
    }

    const { clientSecret } = await makePaymentIntet();

    if (!clientSecret) {
      setProcessing(false);
      return;
    }

    const paymentMethod = await createPayment(cardElement);

    if (!paymentMethod) {
      setProcessing(false);
      return;
    }

    const id = paymentMethod.paymentMethod.id;
    confirmPayment(clientSecret, id);
  };

  return [state, dispatchData, handleOnPaymentSubmit, errors, isProcessing];
};

export default useData;
