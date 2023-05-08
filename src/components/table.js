import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../index'
import axios from 'axios';
import { message } from 'antd';

const Table = ({ name, setName,
    address, setAddress,
    phone, setPhone,
    about, setAbout,
    update, setUpdate,
    index, setIndex,
    table, setTable
}) => {

    // const [name, setName] = useState('')
    // const [address, setAddress] = useState('')
    // const [phone, setPhone] = useState('')
    // const [img, setImg] = useState('')
    // const [about, setAbout] = useState('')
    // const [update, setUpdate] = useState(false)
    // const [index, setIndex] = useState()

    const { task, setTask } = useContext(Context)

    const [tableee, setTableee] = useState([task])

    useEffect(() => {
        console.log('tablok', table)
        if (table === undefined) {
            // table = tableee
            // setTable(task)
            // console.log('tableee', tableee)
            // console.log('table', table)
            // console.log('task', task)
        }
    }, [])

    const [tablee, setTablee] = useState([
        {
            name: 'Fahad',
            address: 'Garden West',
            phone: '03232846250',
            img: 'google.com',
            about: 'Fahad is coincidence name'
        },
        {
            name: 'Aftab',
            address: 'Male',
            phone: '03232846250',
            img: 'google.com',
            about: 'Aftab is my High School friend.'
        },
    ])

    const updateFunc = i => {
        setName(table[i].name)
        setAddress(table[i].address)
        setPhone(table[i].phone)
        setAbout(table[i].about)
        setUpdate(true)
        setIndex(i)
    }

    const deleteFunc = async i => {
        table = table.filter(v => v._id !== table[i]._id)
        setTable(...[table])
        try {
            const res = axios.delete(`http://localhost:4000/api/v1/task/${table[i]._id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            console.log('res', res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Image</th>
                        <th scope="col">About</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {table !== undefined && table.map((v, i) =>
                        <tr key={i}>
                            <th scope='row'>{i + 1}</th>
                            <td>{v.name}</td>
                            <td>{v.address}</td>
                            <td>{v.phone}</td>
                            <td>{v.img}</td>
                            <td>{v.about}</td>
                            <td
                                style={{
                                    display: 'flex', fontSize: 13, padding: 5
                                }}
                            >
                                <button
                                    className='btn tbl'
                                    style={{
                                        marginRight: 2
                                    }}
                                    onClick={() => updateFunc(i)}>Update</button>
                                <button
                                    className='btn tbl'
                                    onClick={() => deleteFunc(i)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table
