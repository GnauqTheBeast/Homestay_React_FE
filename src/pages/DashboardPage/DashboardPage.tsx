import { Layout, Row, Col, Card } from 'antd';
import ChartLine from '../../components/ChartLine/ChartLine';

const { Content } = Layout;

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <Layout className="site-layout">
        <Content className="bg-gray-100 p-4 md:p-6">
          <Row gutter={[16, 16]} className="mt-4">
            <Col span={24}>
              <Card className="bg-white rounded-lg shadow-md p-6">
                <ChartLine />
              </Card>
            </Col>
          </Row>
        </Content>
    </Layout>
  );
}

export default DashboardPage;
