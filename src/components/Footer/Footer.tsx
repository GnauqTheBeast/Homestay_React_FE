import { Col, Row } from "antd";

const Footer = () => {
    return (
        <>
            <div style={{ backgroundColor: '#caced1', color: '#fff' }}>
                <div className='p-4'>
                    <Row gutter={[16, 16]}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Col key={item} lg={4} md={8} sm={12} xs={24}>
                            <div className='bg-image hover-overlay shadow-1-strong rounded'>
                                <img src={`https://mdbcdn.b-cdn.net/img/new/fluid/city/11${item}.webp`} className='w-100' alt={`City ${item}`} />
                                <a href='#!'>
                                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                </a>
                            </div>
                        </Col>
                    ))}
                    </Row>
                </div>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2024 Gnauq Homestay. All rights reserved.
                </div>
            </div>
        </>
    )
}

export default Footer;