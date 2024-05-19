import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import ChartLine from '../../components/ChartLine/ChartLine';

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <>
      <Layout className="site-layout">
        <Content className="bg-gray-100 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <ChartLine />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default DashboardPage