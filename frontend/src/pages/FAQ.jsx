import React, { useState } from "react";

const HelpCenter = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const topics = {
    issues: [
      {
        question: "How to report an issue?",
        answer:
          "You can report an issue by going to the 'Report Issue' section in your account settings.",
      },
      {
        question: "How to track an issue?",
        answer:
          "Track your reported issues in the 'My Issues' section of your account.",
      },
    ],
    order: [
      {
        question: "How do I place an order?",
        answer:
          "Navigate to the product you wish to buy, and click 'Add to Cart'. Proceed to checkout to place your order.",
      },
      {
        question: "How to cancel an order?",
        answer:
          "Go to 'My Orders', select the order you want to cancel, and click 'Cancel Order'.",
      },
    ],
    otherIssues: [
      {
        question: "How to change account information?",
        answer:
          "You can change your account information in the 'Account Settings' section.",
      },
      {
        question: "How to contact support?",
        answer:
          "Contact our support team via the 'Support' section in your account.",
      },
    ],
    delivery: [
      {
        question: "Delivery timeframes",
        answer:
          "Delivery timeframes vary depending on your location and the product.",
      },
      {
        question: "How to track my delivery?",
        answer: "Track your delivery in the 'My Orders' section.",
      },
    ],
    login: [
      {
        question: "How to reset my password?",
        answer:
          "Click on 'Forgot Password' on the login page and follow the instructions.",
      },
      {
        question: "How to change my email address?",
        answer: "Change your email address in the 'Account Settings' section.",
      },
    ],
    refunds: [
      {
        question: "How to request a refund?",
        answer:
          "Request a refund by going to 'My Orders' and selecting 'Request Refund'.",
      },
      {
        question: "Refund policies",
        answer: "Read our refund policies in the 'Help' section.",
      },
    ],
    payLater: [
      {
        question: "How does Pay Later work?",
        answer: "Pay Later allows you to purchase now and pay at a later date.",
      },
      {
        question: "Eligibility for Pay Later",
        answer:
          "Eligibility is determined based on your credit history with us.",
      },
    ],
    payment: [
      {
        question: "Accepted payment methods",
        answer:
          "We accept various payment methods including credit/debit cards, UPI, and net banking.",
      },
      {
        question: "Payment issues",
        answer: "If you face any payment issues, contact our support team.",
      },
    ],
    returns: [
      {
        question: "How to return a product?",
        answer: "Initiate a return request in the 'My Orders' section.",
      },
      {
        question: "Return policies",
        answer: "Read our return policies in the 'Help' section.",
      },
    ],
    cancellation: [
      {
        question: "How to cancel an order?",
        answer:
          "Go to 'My Orders', select the order you want to cancel, and click 'Cancel Order'.",
      },
      {
        question: "Cancellation policies",
        answer: "Read our cancellation policies in the 'Help' section.",
      },
    ],
  };

  return (
    <div className="flex mt-[5rem] ml-[5rem]">
      <div className="w-1/4 p-5 border-r">
        <h2 className="mb-5 text-xl font-semibold text-dark-gray">
          Type of Issue
        </h2>
        <ul className="list-none pl-0">
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("issues")}
            >
              Help with your issues
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("order")}
            >
              Help with your order
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("otherIssues")}
            >
              Help with other issues
            </button>
          </li>
        </ul>

        <h2 className="mt-8 mb-5 text-xl font-semibold text-dark-gray">
          Help Topics
        </h2>
        <ul className="list-none pl-0">
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("delivery")}
            >
              Delivery related
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("login")}
            >
              Login and my account
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("refunds")}
            >
              Refunds related
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("payLater")}
            >
              E-Meghalaya Pay Later
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("payment")}
            >
              Payment
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("returns")}
            >
              Returns & Pickup related
            </button>
          </li>
          <li className="mb-4">
            <button
              className="text-dark-red-normal hover:underline"
              onClick={() => setSelectedTopic("cancellation")}
            >
              Cancellation related
            </button>
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-5">
        <h1 className="mb-5 text-2xl font-semibold text-dark-gray">
          Help Centre
        </h1>

        <div className="mb-8">
          <h2 className="mb-5 text-xl font-semibold text-dark-gray">
            Frequently Asked Questions
          </h2>
          <ul className="list-none pl-0">
            {selectedTopic &&
              topics[selectedTopic].map((item, index) => (
                <li className="mb-4" key={index}>
                  <button
                    className="text-dark-red-normal hover:underline"
                    onClick={() => toggleDropdown(index)}
                  >
                    {item.question}
                  </button>
                  {openDropdown === index && (
                    <p className="mt-2 text-dark-gray">{item.answer}</p>
                  )}
                </li>
              ))}
          </ul>
        </div>

        
      </div>
    </div>
  );
};

export default HelpCenter;
