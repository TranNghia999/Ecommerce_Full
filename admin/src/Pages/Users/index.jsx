import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";

// Icons
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

// Bảng UI Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// check box
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import SearchBox from "../../Components/SearchBox";
// Kết nối
import { MyContext } from "../../App";

// của check box
const label = { inputProps: { "aria-label": "Checkbox demo" } };

// các cột
const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 80 },
  { id: "userName", label: "USER NAME", minWidth: 100 },
  {
    id: "userEmail",
    label: "USER EMAIL",
    minWidth: 150,
  },
  {
    id: "userPh",
    label: "USER PHONE NO",
    minWidth: 130,
  },
   {
    id: "createdDate",
    label: "CREATED DATE",
    minWidth: 130,
  },
];

const Users = () => {
  const context = useContext(MyContext);
  const [categoryFilterVal, setCategoryFilterVal] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="card my-4 pt-5  shadow-md sm:rounded-lg bg-white">
        {/* Bộ lọc */}
        <div className="flex items-center w-full  px-5 justify-between">
          <div className="col w-[40%]">
            <h2 className="text-[18px] font-[600]"> Users List </h2>
          </div>

          <div className="col w-[30%] ml-auto">
            <SearchBox />
          </div>
        </div>
        <br />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="">
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/1752" data-discover="true">
                        <img
                          src="https://media.loveitopcdn.com/54/091609-thumb-15222092411420-ds-770.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  Sophia-Pham
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                      <MdOutlineMarkEmailRead />
                      Sophia_pham.@gmail.com
                  </span>
                  
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                     <span className="flex items-center gap-2">
                      <MdLocalPhone />
                      +84 987324 323
                  </span>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                      <FaRegCalendarAlt />
                      25-6-2025
                  </span>
                  
                </TableCell>


              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Users;
