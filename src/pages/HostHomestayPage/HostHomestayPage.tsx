import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar/Sidebar';

type Props = {};

const HostHomestayPage = (props: Props) => {
  return (
    <>
      <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100 w-full">
          <div className="relative pb-32 bg-lightBlue-500">
            <div className="px-4 md:px-6 mx-auto w-full">
              <div>  
                <div className="flex flex-wrap">{<Outlet />}</div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default HostHomestayPage;