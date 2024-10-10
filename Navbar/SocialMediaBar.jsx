import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const SocialMediaBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border border-gray-500 text-white">
      <div className="relative">
        {/* Hoverable Section */}
        <div className="flex justify-center space-x-6 py-3 hover:bg-gray-700 transition duration-300">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="text-2xl hover:text-blue-500 transition duration-200" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="text-2xl hover:text-blue-400 transition duration-200" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedinIn className="text-2xl hover:text-blue-600 transition duration-200" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-2xl hover:text-pink-400 transition duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBar;
