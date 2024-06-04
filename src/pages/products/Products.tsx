import React, { useContext, useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { InitDataContext, InitDataProvider } from "../../context/InitDataContext";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const Products: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dataContext = useContext(InitDataContext);

  if (!dataContext || !dataContext.products) {
    return <div>Loading...</div>;
  }

  const { products } = dataContext;

  return (
    <div className="products">
      <div className="info">
        <h1>Productos</h1>
        <button onClick={() => setOpen(true)}>Agregar nuevo producto</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products.products || []} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

const ProductsWrapper: React.FC = () => (
  <InitDataProvider>
    <Products />
  </InitDataProvider>
);

export default ProductsWrapper;
