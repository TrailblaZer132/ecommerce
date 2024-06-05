import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const scrollFooter = (scrollY, heightFooter) => {
      if (scrollY >= heightFooter) {
        document.querySelector("footer").style.bottom = "0px";
      } else {
        document.querySelector("footer").style.bottom = `-${heightFooter}px`;
      }
    };

    const onLoad = () => {
      const windowHeight = window.innerHeight;
      const footerHeight = document.querySelector("footer").offsetHeight;
      const heightDocument =
        windowHeight +
        document.querySelector(".content").offsetHeight +
        footerHeight -
        20;

      document.getElementById(
        "scroll-animate"
      ).style.height = `${heightDocument}px`;
      document.getElementById(
        "scroll-animate-main"
      ).style.height = `${heightDocument}px`;

      document.querySelector("header").style.height = `${windowHeight}px`;
      document.querySelector("header").style.lineHeight = `${windowHeight}px`;

      document.querySelector(
        ".wrapper-parallax"
      ).style.marginTop = `${windowHeight}px`;

      scrollFooter(window.scrollY, footerHeight);

      window.onscroll = () => {
        const scroll = window.scrollY;

        document.getElementById(
          "scroll-animate-main"
        ).style.top = `-${scroll}px`;

        document.querySelector("header").style.backgroundPositionY = `${
          50 - (scroll * 100) / heightDocument
        }%`;

        scrollFooter(scroll, footerHeight);
      };
    };

    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      window.onscroll = null;
    };
  }, []);

  return (
    <footer className="w-full h-72 bg-gray-500 fixed bottom-[-72] transition-all duration-400 ease-[cubic-bezier(0,0,0,1)] z-[-1]">
      <h1 className="w-full h-full m-0 p-0 text-center uppercase text-white text-6xl leading-[18rem]">
        Footer
      </h1>
    </footer>
  );
};

export default Footer;
