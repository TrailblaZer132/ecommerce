import { useTranslation } from "react-i18next";

const securityTopics = {
  OnlinePayment: [
    {
      question: "Is making online payment secure?",
      answer:
        "Yes, making online payments on our platform is secure. We use SSL encryption technology to protect your card information while securely transmitting it to the respective banks for payment processing.",
    },
    {
      question: "Do you store my card or bank account information?",
      answer:
        "We store only the first six and last four digits of your card number in an encrypted and masked format. We do this to help provide better services and enhance your purchasing experience. Your CVV number is not stored with us.",
    },
    {
      question: "What is a 3D Secure password?",
      answer:
        "The 3D Secure password is an additional password that you'll be asked to enter after entering your card details on the bank’s page. This password, which is known only to you, helps to protect your card from unauthorized use.",
    },
    {
      question: "Does the website store card information?",
      answer:
        "We store only the first six and last four digits of your card number in a secure and encrypted format. We do not store your CVV number or the expiry date of your card.",
    },
    {
      question:
        "What measures are taken to ensure the security of my personal information?",
      answer:
        "We use a variety of security measures, including encryption and authentication tools, to help protect your personal information. We use secure servers when you place orders. All credit card information you supply is transmitted via Secure Socket Layer (SSL) technology and then encrypted within our databases.",
    },
    // Add more questions as needed
  ],
  AccountSecurity: [
    {
      question: "How can I keep my account secure?",
      answer:
        "You can keep your account secure by choosing a strong and unique password, enabling two-factor authentication, and being cautious of phishing emails or websites.",
    },
    {
      question:
        "What should I do if I suspect unauthorized activity on my account?",
      answer:
        "If you suspect unauthorized activity on your account, immediately change your password, review your recent transactions, and contact customer support for assistance.",
    },
    {
      question: "Is my personal information safe with you?",
      answer:
        "Yes, we take the security of your personal information seriously. We employ advanced security measures to protect your data from unauthorized access or misuse.",
    },
    // Add more questions as needed
  ],
  DataPrivacy: [
    {
      question: "How do you handle my personal data?",
      answer:
        "We handle your personal data in accordance with our privacy policy. We collect only the necessary information required for providing our services and do not share it with third parties without your consent.",
    },
    {
      question: "Can I delete my account and personal data?",
      answer:
        "Yes, you can request to delete your account and personal data from our system. Please contact customer support for assistance with this process.",
    },
    {
      question: "Do you use cookies?",
      answer:
        "Yes, we use cookies to improve your browsing experience and provide personalized content. You can manage your cookie preferences in your browser settings.",
    },
    // Add more questions as needed
  ],
  // Add more security topics as needed
};

const OrderCancellationAndReturnPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-8 mt-[5rem]">
      {/* Security Topics Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">{t("Security Topics")}</h2>
        {Object.keys(securityTopics).map((topic) => (
          <div key={topic} className="mb-4">
            <h3 className="text-md font-semibold mb-2">{topic}</h3>
            <ul>
              {securityTopics[topic].map(({ question, answer }, index) => (
                <li key={index} className="mb-2">
                  <p className="font-semibold">{question}</p>
                  <p>{answer}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCancellationAndReturnPolicy;
