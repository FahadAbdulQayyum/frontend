import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { Context } from '../index'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serverURL } from '../index';

const Register = () => {
    const navigate = useNavigate();

    const { isAuthenticated, setIsAuthenticated } = useContext(Context)

    const onFinish = async (values) => {
        console.log('Success:', values);
        let obj = { name: values.firstname, email: values.email, password: values.password }
        console.log('obj', obj);
        try {
            const res = await axios.post(`${serverURL}/api/v1/users/new`, obj, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log(res.data)
            if (res.data.success) {
                navigate('/login')
                return message.success(res.data.message)
            }
            message.warning(res.data.message)

        } catch (e) {
            setIsAuthenticated(false)
            message.warning(e)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ width: '30%' }}
            >
                <h1 style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'Highlight'
                }}>Registeration</h1>
                <Form.Item
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input placeholder='Enter your first name' />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[
                        {
                            message: 'Please input your lastname!',
                        },
                    ]}
                >
                    <Input placeholder='Enter your last name' />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder='Enter your email' type='email' />
                </Form.Item>


                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter the password' />
                </Form.Item>
                <Form.Item
                    name="cpassword"
                    rules={[
                        {
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter the password again' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" block htmlType="submit">
                        Submit
                    </Button>
                    <span className='line'>Already&nbsp;registerd,&nbsp;<Link to={'/login'}>login</Link>&nbsp;here.</span>
                </Form.Item>
            </Form>
        </div >
    );
}

export default Register;