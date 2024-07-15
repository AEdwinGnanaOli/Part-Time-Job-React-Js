import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import axios from 'axios'
import { MdModeEdit, MdDelete } from "react-icons/md";
import '../admin/admin.css'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import Dashboard from './Dashboard';
function VendorProductDetails() {
  const [vendordata, setData] = useState([]);
  const id = sessionStorage.getItem('adminId')
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('https://part-time-job-react-js.onrender.com/admin/vendorproductdetails').then((result) => {
      setData(result.data.vendorDatas)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  const handleDelete = (id) => {
    axios.delete(`https://part-time-job-react-js.onrender.com/admin/vendorproductdelete/${id}`).then((user) => {
      window.location.reload()
    }).catch(err => { console.log(err) })
  }
  const handleUpdate = (id) => {
    navigate('/adminproductupdate', sessionStorage.setItem('adminpid', id))
  }
  const colums = [
    {
      name: "Image",
      selector: row => (<img width={150} height={100} src={`https://part-time-job-react-js.onrender.com/images/${row.image}`} alt='chh' className='vendor-p-img' />)
    },
    {
      name: "Shop Name",
      selector: (row) => row.shopname,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: row => row.shopmobilenumber,
    },
    {
      name: "Address",
      selector: row => row.shopaddress
    },
    {
      name: "work",
      selector: row => row.work
    },
    {
      name: "Salary",
      selector: row => row.price
    },
    {
      name: "Work Start Time",
      selector: row => row.starttime
    },
    {
      name: "Work End Time",
      selector: row => row.endtime
    },
    {
      name: "Action",
      cell: row => (<div className='admin-user-btns'>
        <Button className="admin-edit-btn edit" variant="success" onClick={e => handleUpdate(row._id)}><i><MdModeEdit className='admin-edit-icon' /></i><i></i></Button>
        <Button className="admin-edit-btn" variant="danger" onClick={e => handleDelete(row._id)}> <i><MdDelete className='admin-edit-icon' /></i><i></i></Button>
      </div>),

    }

  ]
  const SearchBar = (e) => {
    const newdata = vendordata.filter(res => {
    return res.shopname.toLowerCase().includes(e.target.value.toLowerCase().trim())

    })
    setData(newdata)
  }
  return (
    <Dashboard title={'Shops'}>
    <div className='admin-body'>
      <DataTable title="Vendor Product Details"
        columns={colums} data={vendordata}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        selectableRows={<Button>delete</Button>}
        selectableRowsHighlight
        highlightOnHover
        actions={<Button variant='success' className='m-3' onClick={e => { navigate(`/vendorsignproduct`) }}>product register</Button>}
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

export default VendorProductDetails