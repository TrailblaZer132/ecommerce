import { useTranslation } from "react-i18next";
import React from "react";

const OrderCancellationAndReturnPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-8 mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">{t("Cancellation & Returns")}</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Cancellation Policy</h2>
        <p className="mb-4">
          The customer can choose to cancel an order any time before it's
          dispatched. The order cannot be canceled once it’s out for delivery.
          However, the customer may choose to reject it at the doorstep.
        </p>
        <p className="mb-4">
          The time window for cancellation varies based on different categories
          and the order cannot be canceled once the specified time has passed.
        </p>
        <p className="mb-4">
          In some cases, the customer may not be allowed to cancel the order for
          free, post the specified time and a cancellation fee will be charged.
          The details about the time window mentioned on the product page or
          order confirmation page will be considered final.
        </p>
        <p className="mb-4">
          In case of any cancellation from the seller due to unforeseen
          circumstances, a full refund will be initiated for prepaid orders.
        </p>
        <p>
          Flipkart reserves the right to accept the cancellation of any order.
          Flipkart also reserves the right to waive off or modify the time
          window or cancellation fee from time to time.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Returns Policy</h2>
        <p className="mb-4">
          Returns is a scheme provided by respective sellers directly under this
          policy in terms of which the option of exchange, replacement and/ or
          refund is offered by the respective sellers to you. All products
          listed under a particular category may not have the same returns
          policy. For all products, the returns/replacement policy provided on
          the product page shall prevail over the general returns policy. Do
          refer the respective item's applicable return/replacement policy on
          the product page for any exceptions to this returns policy and the
          table below.
        </p>
        <p>
          The return policy is divided into three parts; Do read all sections
          carefully to understand the conditions and cases under which returns
          will be accepted.
        </p>
      </div>
    </div>
  );
};

export default OrderCancellationAndReturnPolicy;
