import { Link } from "react-router-dom";
import backgroundImage from "./background.jpg"

interface Props {}

const Start = (props: Props) => {
  return (
    <section
      id="gnauq"
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
        <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
          <h1 className="text-white text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
            Gnauq Homestay
          </h1>
          <p className="text-white text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            Where "home" is not just a place to stay, but an adventure!
          </p>
          <div className="mx-auto lg:mx-0">
            <Link
              to="/home"
              className="py-5 px-10 text-2xl font-bold text-white bg-lightGreen rounded lg:py-4 hover:opacity-70"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
        </div>
      </div>
    </section>
  );
};

export default Start;