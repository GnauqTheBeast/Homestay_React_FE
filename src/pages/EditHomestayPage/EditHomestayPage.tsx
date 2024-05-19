import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Button, Form, Row, Col } from 'antd';
import { HomestayRequest, HomestayResponse } from '../../models/HomestayDto';
import { toast } from 'react-toastify';
import { getHomestay } from '../../services/HomestayService';
import { updateUserHomestay } from '../../services/UserService';

const EditHomestayPage = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [homestay, setHomestay] = useState<HomestayResponse>({} as HomestayResponse);

    useEffect(() => {
        const fetchHomestay = async () => {
            try {
                getHomestay(slug as string).then((res) => {
                    setHomestay(res?.data);
                });
            } catch (error) {
                toast.warning(error as string);
            }
        };
        fetchHomestay();
    }, [slug]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: homestay?.name || '',
            address: homestay?.address || '',
            description: homestay?.description || '',
            service: homestay?.service || '',
            images: homestay?.images || '',
            price: homestay?.price || 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            service: Yup.string().required('Required'),
            images: Yup.string().url('Invalid URL').required('Required'),
            price: Yup.number().required('Required').positive('Must be positive'),
        }),
        onSubmit: async (values: HomestayRequest) => {
            try {
                await updateUserHomestay(slug as string, values) && toast.success("Homestay updated successfully");

                navigate('/users/homestay-list');
            } catch (error) {
                console.error('Error updating homestay:', error);
                toast.error("Failed to update homestay");
            }
        },
    });

    if (!homestay) return <div>Loading...</div>;

    return (
        <div className='flex flex-col justify-center p-5'>
            <h2 className="text-2xl font-bold text-lightGreen p-2">Edit Homestay</h2>
            <Form onFinish={formik.handleSubmit} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Name"
                            validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                            help={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                        >
                            <Input
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Address"
                            validateStatus={formik.errors.address && formik.touched.address ? 'error' : ''}
                            help={formik.errors.address && formik.touched.address ? formik.errors.address : ''}
                        >
                            <Input
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Description"
                            validateStatus={formik.errors.description && formik.touched.description ? 'error' : ''}
                            help={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
                        >
                            <Input.TextArea
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Service"
                            validateStatus={formik.errors.service && formik.touched.service ? 'error' : ''}
                            help={formik.errors.service && formik.touched.service ? formik.errors.service : ''}
                        >
                            <Input
                                name="service"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.service}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Image URL"
                            validateStatus={formik.errors.images && formik.touched.images ? 'error' : ''}
                            help={formik.errors.images && formik.touched.images ? formik.errors.images : ''}
                        >
                            <Input
                                name="images"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.images}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Price"
                            validateStatus={formik.errors.price && formik.touched.price ? 'error' : ''}
                            help={formik.errors.price && formik.touched.price ? formik.errors.price : ''}
                        >
                            <Input
                                name="price"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default EditHomestayPage;
