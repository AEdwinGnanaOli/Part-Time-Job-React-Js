import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import $ from "jquery";
import "datatables.net";
import Dashboard from "./Dashboard";
function LoginUserData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://part-time-job-react-js.onrender.com/login/userdata").then((user) => {
      setData(user.data.userDatas);
    });
    const datatable = $("#datatable").DataTable({
      colums: [{ title: "Vendor name", data: data.name }],
    });
    return () => {
      datatable.destroy();
    };
  }, [data]);

  useEffect(() => {
    axios.get("https://part-time-job-react-js.onrender.com/login/userdata").then((user) => {
      setData(user.data.userDatas);
    });
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`https://part-time-job-react-js.onrender.com/deletedetails/${id}`)
      .then((user) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const colums = [
    {
      name: "Vendor Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "lastLoginDate",
      selector: (row) => row.lastLoginDate,
    },
    {
      name: "lastLoginTime",
      selector: (row) => row.lastLogintime,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          className="admin-edit-btn"
          variant="danger"
          onClick={(e) => handleDelete(row.UserId)}
        >
          {" "}
          <i>
            <MdDelete className="admin-edit-icon" />
          </i>
        </Button>
      ),
    },
  ];
  // console.log(colums)
  const SearchBar = (e) => {
    const newdata = data.filter((res) => {
      return res.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase().trim());
    });
    setData(newdata);
  };
  return (
    <Dashboard title={'Login-User-Details'}>
      <div className="admin-body ">
        <DataTable
          title="User Login Details"
          columns={colums}
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRows={<Button>delete</Button>}
          selectableRowsHighlight
          highlightOnHover
          actions
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="admin-search-hover form-control"
              placeholder="search here..."
              onChange={SearchBar}
            />
          }
          onRowDelete={(row) => {
            handleDelete(row._id);
          }}
        />
      </div>
    </Dashboard>
  );
}

export default LoginUserData;
