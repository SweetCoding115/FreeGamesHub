import { Image } from "@nextui-org/react";
import { socialMediaLinks } from "../../utils";
import { FaGithub, FaSkype, FaDiscord, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const getSocialMediaIcon = (url: string) => {
  switch (url) {
    case "github":
      return <FaGithub size={30} />;
    case "skype":
      return <FaSkype size={30} />;
    case "gmail":
      return <FaEnvelope size={30} />;
    case "discord":
      return <FaDiscord size={30} />;
    default:
      return <FaGithub size={30} />;
  }
};

const getClassNames = (name: string) => {
  switch (name) {
    case "github":
      return "text-gray-400 hover:text-gray-500";
    case "skype":
      return "text-pink-500 hover:text-pink-600";
    case "gmail":
      return "text-blue-400 hover:text-blue-500";
    case "discord":
      return "text-blue-600 hover:text-blue-700";
    default:
      return "text-gray-400 hover:text-gray-500";
  }
};

export const Footer = () => {
  return (
    <footer className="dark  bg-background text-gray-400 body-font py-4 dark-bg-2">
      <div className="container mx-auto flex items-center flex-col">
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <Image
            src="/logo-sm.png"
            width={40}
            alt="Free Games Hub"
            radius="sm"
          />
          <span className="ml-3 bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent font-bold">
            © {new Date().getFullYear()} <Link to="/sitemap">FreeGamesHub</Link>
          </span>
        </div>
        <div className="flex mt-6 gap-10">
          {socialMediaLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_black"
              rel="noopener noreferrer"
              className={getClassNames(link.name)}
            >
              {getSocialMediaIcon(link.name)}
            </a>
          ))}
        </div>
        <p className="mt-5 text-center">
          Thanks to{" "}
          <a
            href="https://www.freetogame.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            freetogame.com
          </a>{" "}
          &{" "}
          <a
            href="https://www.mmobomb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {" "}
            MMOBomb.com
          </a>{" "}
          for providing awesome APIs
        </p>
      </div>
    </footer>
  );
};
