import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import { MdModeEdit, MdDelete, MdDashboard } from "react-icons/md";
import axios from 'axios'
import '../admin/admin.css'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import Dashboard from './Dashboard'
function UserDetails() {
  const [userdata, setData] = useState([]);
  const [qurey,setQurey]=useState('')
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/admin/userdetails').then((result) => {
      setData(result.data.userDetails)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/user/delete/${id}`).then((user) => {
      window.location.reload()
    }).catch(err => { console.log(err) })
  }
  const handleUserUpdate = (id) => {
    navigate('/admin/user/update', sessionStorage.setItem('adminuupdateid', id))
  }
  const colums = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: "Role",
      selector: row => row.role
    },
    {
      name: "Action",
      cell: row => (<div className='admin-user-btns'>
        <Button className="admin-edit-btn edit" variant="success" onClick={e => handleUserUpdate(row._id)}><i><MdModeEdit className='admin-edit-icon' /></i><i></i></Button>
      <Button className="admin-edit-btn" variant="danger" onClick={e => handleDelete(row._id)}> <i><MdDelete className='admin-edit-icon' /></i><i></i></Button>
      </div>),
      
    }

  ]
  console.log(colums)
  useEffect(() => {
    const newdata = userdata.filter(res => {
      return res.name.toLowerCase().includes(qurey.toLowerCase().trim())||res.email.toLowerCase().includes(qurey.toLowerCase().trim())||res.phone.toLowerCase().includes(qurey.toLowerCase().trim())||res.role.toLowerCase().includes(qurey.toLowerCase().trim())
    })

    setData(newdata)
  },[qurey])
  return (
    <Dashboard title={'User-Details'}>
    <div className='admin-body'>
      <DataTable title=" User Details"
        columns={colums} data={userdata}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={<Button variant='success' className='m-3'onClick={e => { navigate(`/usersign`) }}>+Add</Button>}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="admin-search-hover form-control"
            placeholder="search here..."
            onChange={(e)=>{setQurey(e.target.value)}}
          />
        }
      />
    </div>
    </Dashboard>
  )
}

export default UserDetails