import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import { MdModeEdit, MdDelete } from "react-icons/md";
import '../admin/admin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import Dashboard from './Dashboard';

function VendorDetails() {
  const [vendordata, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/admin/vendordetails').then((result) => {
      setData(result.data.vendorDatas)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/vendor/delete/${id}`).then((user) => {
      window.location.reload()
    }).catch(err => { console.log(err) })
  }
  const handleVendorUpdate = (id) => {
    navigate('/admin/vendor/update', sessionStorage.setItem('adminvupdateid', id))
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
        <Button className="admin-edit-btn edit" variant="success" onClick={e => handleVendorUpdate(row._id)}><i><MdModeEdit className='admin-edit-icon' /></i><i></i></Button>
        <Button className="admin-edit-btn" variant="danger"onClick={e => handleDelete(row._id)}> <i><MdDelete className='admin-edit-icon' /></i><i></i></Button>
      </div>),

    }

  ]
  const SearchBar = (e) => {
    const newdata = vendordata.filter(res => {
      return res.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
    })
    setData(newdata)
  }
  return (
    <Dashboard title={'Vendor-Details'}>
    <div className='admin-body'>
      <DataTable title="Vendor Details"
        columns={colums} data={vendordata}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        selectableRows={<Button>delete</Button>}
        selectableRowsHighlight
        highlightOnHover
        actions={<Button variant='success' className='m-3'onClick={e => { navigate(`/vendorsignproduct`) }}>+Add</Button>}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="admin-search-hover form-control"
            placeholder="search here..."
            onChange={SearchBar}
          />
        }
      />
    </div>
    </Dashboard>
  )
}

export default VendorDetails