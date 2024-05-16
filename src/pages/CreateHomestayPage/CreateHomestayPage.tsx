import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Row, Col } from 'antd';
import { HomestayRequest } from '../../models/HomestayDto';
import { createHomestay } from '../../services/UserService';
import { toast } from 'react-toastify';

const CreateHomestayPage = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            description: '',
            service: '',
            images: '',
            price: 0,
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
            await createHomestay(values) && toast.success("Create new homestay successful"); 
            navigate('/homestay/create');
        },
    });

    return (
        <div className='flex flex-col justify-center p-5'>
            <h2 className="text-2xl font-bold text-lightGreen p-2">Create Homestay</h2>
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

export default CreateHomestayPage;
