import React from "react";

const Payments = () => {
  return (
    <div className="container mx-auto px-4 mt-[5rem]">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Payments</h1>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        How do I pay for an E-Meghalaya purchase?
      </h2>
      <p className="mb-8 text-gray-700">
        E-Meghalaya offers multiple payment methods. Whatever your online mode
        of payment, you can rest assured that E-Meghalaya's trusted payment
        gateway partners use secure encryption technology to keep your
        transaction details confidential at all times.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        What credit/debit cards are accepted on E-Meghalaya?
      </h2>
      <p className="mb-8 text-gray-700">
        We accept payments made using Visa, MasterCard, Maestro, and American
        Express credit/debit cards.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        My transaction failed but the money was deducted. What should I do?
      </h2>
      <p className="mb-8 text-gray-700">
        Please check your bank/credit card account to ensure if your account has
        been debited. If your account has been debited after a payment failure,
        it is usually rolled back by banks within 10 business days. For any
        other assistance, you can write to us at support@e-meghalaya.com or call
        us at 1234-567890.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        How can I make a payment using EMI?
      </h2>
      <p className="mb-8 text-gray-700">
        If you have an EMI-enabled credit card from any of our partner banks,
        you will see the EMI options available to you on the payment page. The
        EMI options include tenures of 3, 6, 9, and 12 months.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Can I use my bank's Internet Banking feature to make a payment?
      </h2>
      <p className="mb-8 text-gray-700">
        Yes. E-Meghalaya offers you the convenience of using your bank’s
        Internet Banking service to make a payment towards your order. With
        this, you can directly transfer funds from your bank account while
        conducting a highly secure transaction.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        What other payment options are available on E-Meghalaya?
      </h2>
      <p className="mb-8 text-gray-700">
        Apart from using Debit/Credit Cards and Net Banking, you can also pay
        using UPI and Wallets like Paytm, PhonePe, and Google Pay. Cash on
        Delivery is also available for select pin codes.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Is it safe to use my credit/debit card on E-Meghalaya?
      </h2>
      <p className="mb-8 text-gray-700">
        Your online transaction on E-Meghalaya is secure with the highest levels
        of transaction security currently available on the Internet. E-Meghalaya
        uses SSL encryption technology to protect your card information while
        securely transmitting it to the respective banks for payment processing.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Do you store my card or bank account information?
      </h2>
      <p className="mb-8 text-gray-700">
        E-Meghalaya does not store your complete card or bank account
        information. E-Meghalaya stores only the first six and last four digits
        of your card number in an encrypted and masked format. We do this to
        help provide better services and enhance your purchasing experience.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        How do I pay using a saved card?
      </h2>
      <p className="mb-8 text-gray-700">
        To pay using a saved card, you will need to enter your CVV number at the
        time of payment. Since your CVV number is not stored with us, only you
        can use your saved card on E-Meghalaya.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        What is a 3D Secure password?
      </h2>
      <p className="mb-8 text-gray-700">
        The 3D Secure password is an additional password that you will be asked
        to enter after entering your card details on the bank’s page. This
        password, which is known only to you, helps to protect your card from
        unauthorized use. You can register for the 3D Secure password for your
        credit/debit card by visiting your bank’s website.
      </p>
    </div>
  );
};

export default Payments;
