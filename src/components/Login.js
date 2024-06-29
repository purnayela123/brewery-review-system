import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthToken }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        setLoading(true);
        axios.post('/api/login', values)
            .then(response => {
                setAuthToken(response.data.token);
                navigate('/');
            })
            .catch(error => {
                console.error("There was an error logging in!", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Form
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            style={{ maxWidth: '300px', margin: 'auto', marginTop: '100px' }}
        >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
