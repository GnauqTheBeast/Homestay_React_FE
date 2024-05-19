import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBill, FaTable,  } from "react-icons/fa";
import { useAuth } from "../../contexts/useAuth";

interface Props {
}

const Sidebar = (props: Props) => {
    const navigate = useNavigate();

    const { userRole } = useAuth();

    return (
      <nav className="mt-24 h-screen block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
        <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
          <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
            <div className="md:flex-col md:min-w-full flex flex-col list-none">
            <div
              onClick={() => navigate('/users/profile')}
              className="cursor-pointer flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaHome />
              <h6 className="ml-3">Profile</h6>
            </div>
            {userRole === "host" || userRole === "admin" ? <Link
              to="finance"
              className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTable />
              <h6 className="ml-3">Finance</h6>
            </Link> : <></>}
            {userRole === "host" ? <div
              onClick={() => navigate('homestay-list')}
              className="cursor-pointer flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTable />
              <h6 className="ml-3">List Homestay</h6>
            </div> : <></>}
            {userRole === "host" ? <Link
              to="homestay-booked"
              className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTable />
              <h6 className="ml-3">Booked Homestay</h6>
            </Link> : <></>}
            {userRole === "admin" ? <Link
              to="revenue"
              className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTable />
              <h6 className="ml-3">Revenue</h6>
            </Link> : <></>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;