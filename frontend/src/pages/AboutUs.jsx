const AboutUs = () => {
  return (
    <div className="flex flex-row  mt-[8rem] ml-[5rem]">
      <div className=" w-[70%]">
        <h1 className="mb-4 text-2xl font-bold text-dark-gray">About Us</h1>
        <p className="mb-4 text-dark-gray">
          We are a dedicated team of developers committed to delivering
          high-quality e-commerce solutions. Our mission is to provide a
          seamless online shopping experience, addressing the evolving needs of
          both businesses and consumers. We focus on creating innovative
          solutions that enhance user experience, streamline operations, and
          drive business growth.
        </p>
        <p className="mb-4 text-dark-gray">
          Our team is composed of experienced software engineers, designers, and
          product managers who work collaboratively to build and improve our
          platform. Our engineers use the latest technologies to develop robust
          and secure applications, while our designers craft intuitive and
          visually appealing user interfaces. Product managers oversee the
          planning and execution of new features, ensuring projects are
          completed on time and within budget.
        </p>
        <p className="mb-4 text-dark-gray">
          We collaborate with industry experts and partners to stay informed
          about the latest e-commerce trends, continuously refining our platform
          with cutting-edge features. Our commitment to quality and customer
          satisfaction drives us to prioritize user needs and deliver
          exceptional products and services. As we grow, we remain passionate
          about innovation and dedicated to providing a seamless online shopping
          experience. Thank you for choosing us as your trusted e-commerce
          partner.
        </p>
      </div>

      <div className="w-1/3 mr-[5rem] pt-10 ml-10">
        <img
          src="https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About Us"
          className="rounded-lg object-cover h-full w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AboutUs;
