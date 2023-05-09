import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Context } from '../index'
import Table from './table'
import { message } from 'antd'
import { serverURL } from '../index'

const Home = () => {

    const navigate = useNavigate();

    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const { user, setUser } = useContext(Context)
    const { userId, setUserId } = useContext(Context)
    const { task, setTask } = useContext(Context)
    const data = useContext(Context)
    console.log('data', data);
    console.log('****', localStorage.getItem('userData') === "undefined");
    console.log('isAuth', isAuthenticated);
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [img, setImg] = useState('')
    const [about, setAbout] = useState('')
    const [update, setUpdate] = useState(false)
    const [index, setIndex] = useState()
    const [table, setTable] = useState()


    useEffect(() => {
        dataRender();
        userRender();
        // if (localStorage.getItem('userData') === "undefined") {
        //     console.log('undefinedddd');
        //     localStorage.removeItem('userData')
        // }
        console.log('useEffect()', task)
        let auth = localStorage.getItem('IsAuthenticated')
        if (JSON.parse(auth)) return setIsAuthenticated(true)
        if (!isAuthenticated || localStorage.getItem('userData') === "undefined") return navigate('/login')
    }, [])

    const userRender = () => {
        axios.get(`${serverURL}/api/v1/users/me`, {
            withCredentials: true,
        }).then((res) => {
            console.log('dataaaaaaaaa', res)
            setUser(res.data.user)
            setIsAuthenticated(true)
        }).catch(err => {
            setUser({})
            setIsAuthenticated(false)
            console.log('errrrr', err)
        })
    }

    const dataRender = () => {
        console.log('reeee prior')
        axios.get(`${serverURL}/api/v1/task/my`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }).then(res => {
            console.log('reeee', res)
            const { tasks } = res.data
            console.log('taskkk', tasks)
            setTable(tasks)
            setTask(tasks)
        })
    }

    const Logout = () => {
        console.log('logged out')
        navigate('/login')
        setIsAuthenticated(false)
        localStorage.removeItem('userData')
        localStorage.setItem('IsAuthenticated', false)
    }

    const onClick = e => {
        e.preventDefault();
        let obj = {
            name: name,
            address: address,
            phone: phone,
            img: img,
            about: about
        }

        try {
            const res = axios.post(`${serverURL}/api/v1/task/new`, obj, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            console.log('res', res)
            message.success('Added Successfully')
        } catch (error) {
            message.error('Error while updating')
            console.log(error)
        }

        table.push(obj)
        setTable(...[table])
        setName('')
        setAddress('')
        setPhone('')
        setImg('')
        setAbout('')
        console.log('obj', obj);
    }

    const onUpdate = e => {
        e.preventDefault();
        let objUpd = {
            name: name,
            address: address,
            phone: phone,
            img: img,
            about: about
        }

        try {
            const res = axios.put(`${serverURL}/api/v1/task/${table[index]._id}`, objUpd, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            console.log('res', res)
            message.success('Updated Successfully')
        } catch (error) {
            message.error('Error while updating')
            console.log(error)
        }
        table[index] = objUpd
        setName('')
        setAddress('')
        setPhone({})
        setAbout('')
        setIndex('')
        setUpdate(false)
    }

    const onCancel = () => {
        setName('')
        setAddress('')
        setPhone({})
        setImg('')
        setAbout('')
        setUpdate(false)
        setIndex('')
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className='div'>
                <ul>
                    <h4>Welcome, {`${JSON.parse(localStorage.getItem('userData'))?.name} `}</h4>
                    {/* <h4>Welcome, `${user.name}`</h4> */}
                    {!isAuthenticated ? <li>
                        <Link to={'/login'}>Login</Link>
                    </li> :
                        <li onClick={Logout}>
                            Logout
                        </li>
                    }
                </ul>
            </div>
            <form className="form"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '30px',
                    width: '50%'
                }}
            >
                <input type="text" placeholder='Enter the name' value={name} onChange={e => setName(e?.target?.value)} />
                <input type="text" placeholder='Enter the address' value={address} onChange={e => setAddress(e?.target?.value)} />
                <input type="number" placeholder='Enter the phone' value={phone} onChange={e => setPhone(e?.target?.value)} />
                <input type="file" accept='images/*' />
                <input type="text" placeholder='Enter the About' value={about} onChange={e => setAbout(e?.target?.value)} />
                {!update ? <input type="submit" value={'Add'} onClick={onClick} /> :
                    <span>
                        <input type="submit"
                            style={{ width: '50%' }}
                            value={'Update'} onClick={onUpdate} />
                        <input type="submit"
                            style={{ width: '50%' }}
                            value={'Cancel'} onClick={onCancel} />
                    </span>
                }
            </form>
            <Table setName={setName} name={name}
                address={address} setAddress={setAddress}
                phone={phone} setPhone={setPhone}
                about={about} setAbout={setAbout}
                update={update} setUpdate={setUpdate}
                index={index} setIndex={setIndex}
                table={table} setTable={setTable}
            />
        </div >
    )
}

export default Home
