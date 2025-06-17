import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAddress } from "../contexts/AddressContext";
import { themes } from "../ckoFlowOptions/appearance";
import { getComponentOptions } from '../ckoFlowOptions/componentOptions';
import { translations } from '../ckoFlowOptions/translations';

export default function CheckoutFlow() {

  const { cartItems } = useCart();
  const { addresses } = useAddress();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!window.CheckoutWebComponents) {
      console.error("CheckoutWebComponents not loaded");
      setError("Payment system not available. Please try again later.");
      setLoading(false);
      return;
    }

    const billingAddress = addresses?.billing || {};
    const customer = addresses?.customer || {};

    console.log("Cart items:", cartItems);
    console.log("Addresses:", addresses);
    console.log("Billing Address:", billingAddress);
    console.log("Customer Email:", customer.email);

    const missingFields = [];
    if (cartItems.length === 0) missingFields.push("cart items");
    if (!billingAddress.address_line1) missingFields.push("billing address line 1");
    if (!billingAddress.city) missingFields.push("billing city");
    if (!billingAddress.zip) missingFields.push("billing zip");
    if (!billingAddress.country) missingFields.push("billing country");
    if (!customer.email) missingFields.push("customer email");

    const isReady =
      cartItems.length > 0 &&
      billingAddress.address_line1 &&
      billingAddress.city &&
      billingAddress.zip &&
      billingAddress.country &&
      customer.email;

    if (!isReady) {
      console.warn(`Checkout not ready. Missing: ${missingFields.join(", ")}.`);
      setError(`Please provide the following: ${missingFields.join(", ")}.`);
      setLoading(false);
      return;
    }

    const createPaymentSession = async () => {
      try {
        console.time("PaymentSessionFetch");
        let paymentSessionData = JSON.parse(localStorage.getItem("paymentSession"));
        if (!paymentSessionData) {
          const payload = {
            items: cartItems.map(({ product, quantity }) => ({
              name: product.name,
              quantity,
              unit_price: product.price,
              total_amount: product.price * quantity,
              reference: `item_${product.id || Math.random().toString(36).substring(2, 10)}`,
            })),
            currency: "GBP",
            address: {
              billing: {
                address_line1: billingAddress.address_line1,
                city: billingAddress.city,
                zip: billingAddress.zip,
                country: billingAddress.country,
                phone: {
                  country_code: billingAddress.phone?.country_code || undefined,
                  number: billingAddress.phone?.number || undefined,
                },
              },
              customer: {
                email: customer.email,
                phone: {
                  country_code: customer.phone?.country_code || undefined,
                  number: customer.phone?.number || undefined,
                },
              },
              shipping: addresses.shipping?.address_line1 ? {
                address_line1: addresses.shipping.address_line1,
                address_line2: addresses.shipping.address_line2 || undefined,
                city: addresses.shipping.city || undefined,
                state: addresses.shipping.state || undefined,
                zip: addresses.shipping.zip || undefined,
                country: addresses.shipping.country || undefined,
                phone: {
                  country_code: addresses.shipping.phone?.country_code || undefined,
                  number: addresses.shipping.phone?.number || undefined,
                },
              } : undefined,
            },
          };

          console.log("Sending payload to /api/create-payment-session:", payload);

          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/create-payment-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          paymentSessionData = await res.json();
          if (!res.ok) throw new Error(paymentSessionData.error || "Payment session failed");
        }
        console.timeEnd("PaymentSessionFetch");

        console.time("CheckoutInit");
        const checkout = await window.CheckoutWebComponents({
          publicKey: import.meta.env.VITE_CKO_PUBLIC_KEY,
          environment: "sandbox",
          locale: "en",
          // appearance: themes["neon"],
          componentOptions: getComponentOptions(customer),
          translations: translations,
          paymentSession: paymentSessionData,
          onReady: () => console.log("Checkout.com Flow ready"),
          onPaymentCompleted: (_component, paymentResponse) => {
            console.log("Payment completed. Payment ID:", paymentResponse.id);
            localStorage.removeItem("paymentSession");
            window.location.href = "/success";
          },
          onChange: (component) => {
            console.log(`onChange → isValid: ${component.isValid()} for ${component.type}`);
          },
          onError: (component, error) => {
            console.error("onError:", error, "Component:", component.type);
            localStorage.removeItem("paymentSession");
            window.location.href = "/failure";
          },
        });
        console.timeEnd("CheckoutInit");
        console.time("FlowMount");
        const flowComponent = checkout.create("flow");
        // const applepayComponent = checkout.create("applepay");
        // const googlepayComponent = checkout.create("googlepay");
        console.log("Flow component created");
        setTimeout(() => flowComponent.mount("#flow-container"), 0);
        // if (await googlepayComponent.isAvailable()) {
        //   googlepayComponent.mount('#googlepay-container');
        // }
        // if (await applepayComponent.isAvailable()) {
        //   applepayComponent.mount('#applepay-container');
        // }
        console.timeEnd("FlowMount");
      } catch (err) {
        console.error("Checkout flow error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createPaymentSession();
  }, [cartItems, addresses, themes]);

  return (
    <div className=" bg-gray-50">
      {loading && (
        <div className="flex flex-col justify-center items-center min-h-[400px] bg-white rounded-2xl border border-gray-100 mx-4">
          {/* loading spinner */}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mx-4 mb-6">
          {/* error message */}
        </div>
      )}

      <div id="flow-container" className="w-full" />
      {/* <div id="applepay-container" className="w-full" />
      <div id="googlepay-container" className="w-full" /> */}
    </div>
  );
}