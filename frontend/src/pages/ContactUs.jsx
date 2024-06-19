import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center mt-[8rem]">
      <div className="flex flex-col-reverse lg:flex-row items-center  max-w-4xl p-8 lg:p-0">
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="mb-4 text-2xl font-bold text-dark-gray">{t("Contact Us")}</h1>
          <p className="mb-4 text-dark-gray">
            We would love to hear from you! Whether you have a question about
            features, pricing, need a demo, or anything else, our team is ready
            to answer all your questions.
          </p>
          <p className="mb-4 text-dark-gray">
            National Law University Meghalaya, Jingkieng, Nongthymmai, Umsawli,
            Shillong, Meghalaya 793018
          </p>
          <p className="mb-4 text-dark-gray">Phone: (+91) 0000000000</p>
          <p className="mb-4 text-dark-gray">Email: contact@gmail.com</p>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Us"
            className="rounded-lg object-cover h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
