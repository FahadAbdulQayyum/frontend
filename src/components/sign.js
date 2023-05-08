import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../index';
import { useContext } from 'react';


const Sign = () => {

    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const { user, setUser } = useContext(Context)

    const onFinish = async (values) => {

        console.log('Success:', values);

        try {
            const res = await axios.post('http://localhost:4000/api/v1/users/login', values, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            );
            console.log('res.dataaaaaaaaaaaaaa', res.data)
            localStorage.setItem('userData', JSON.stringify(res?.data?.user))
            console.log('atk');
            if (res.data.success) {
                setIsAuthenticated(true)
                localStorage.setItem('IsAuthenticated', true)
                setUser(res.data.message)
                console.log('res.data.message', res.data.message);
                return message.success(res.data.message)
            }
            message.error(res.data.message)

        } catch (e) {
            setIsAuthenticated(false)
            message.error(e)
        }
    };
    if (isAuthenticated) return <Navigate to='/' />
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
                }}>Sign Up</h1>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder='Enter email' type='email' />
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

                <Form.Item>
                    <Button type="primary" block htmlType="submit">
                        Submit
                    </Button>
                    <span className='line'>Haven't&nbsp;registerd&nbsp;yet,&nbsp;<Link to={'/register'}>register</Link>&nbsp;here.</span>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Sign;