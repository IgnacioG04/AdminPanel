import React, { useContext, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import Add from "../../components/add/Add";
import { InitDataContext } from "../../context/InitDataContext";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.avatarUrl || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "detail",
    type: "string",
    headerName: "Detail",
    width: 200,
  },
];

const Users: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dataContext = useContext(InitDataContext);

  if (!dataContext || !dataContext.users) {
    return <div>Loading...</div>;
  }

  const { users } = dataContext;

  return (
    <div className="users">
      <div className="info">
        <h1>Usuarios</h1>
        <button onClick={() => setOpen(true)}>Agregar nuevo usuario</button>
      </div>
      <DataTable slug="users" columns={columns} rows={users.users || []} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
