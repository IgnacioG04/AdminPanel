import React, { useContext } from "react";
import "./Products.scss";
import ChartBox from "../../components/chartBox/ChartBox";
import { InitDataContext, InitDataProvider } from "../../context/InitDataContext";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "../../components/pieCartBox/pieChartBox.scss"

const TotalProducts: React.FC = () => {
  const dataContext = useContext(InitDataContext);

  if (!dataContext || !dataContext.products) {
    return <div>Loading...</div>;
  }

  const { products } = dataContext;

  return (
    <div className="box box3">
      <ChartBox {...{
        color: "skyblue",
        icon: "/productIcon.svg",
        title: "Total Productos",
        number: products.count,
        dataKey: "products",
        percentage: 0,
        chartData: [
          { name: "Dom", products: 400 },
          { name: "Lu", products: 600 },
          { name: "Ma", products: 500 },
          { name: "Mie", products: 700 },
          { name: "Jue", products: 400 },
          { name: "Vi", products: 500 },
          { name: "Sab", products: 450 },
        ],
      }} />
    </div>
  );
};

const TotalCategories: React.FC = () => {
  const dataContext = useContext(InitDataContext);

  if (!dataContext || !dataContext.products) {
    return <div>Loading...</div>;
  }

  const { products } = dataContext;

  return (
    <div className="box box3">
      <ChartBox {...{
        color: "skyblue",
        icon: "/productIcon.svg",
        title: "Total Categorias de productos",
        number: Object.keys(products.countByCategory).length,
        dataKey: "products",
        percentage: 0,
        chartData: [
          { name: "Dom", products: 400 },
          { name: "Lu", products: 600 },
          { name: "Ma", products: 500 },
          { name: "Mie", products: 700 },
          { name: "Jue", products: 400 },
          { name: "Vi", products: 500 },
          { name: "Sab", products: 450 },
        ],
      }} />
    </div>
  );
};

const ProductsByCategory = () => {
  const dataContext = useContext(InitDataContext);

  if (!dataContext || !dataContext.products) {
    return <div>Loading...</div>;
  }

  const { products } = dataContext;

  const data = [];

  for (const category in products.countByCategory) {
    const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    let color = "#" + genRanHex(6);
    data.push({ "name": category, "value": products.countByCategory[category], "color": color })
  }

  return (
    <div className="pieChartBox">
      <h1>Productos por categoria</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsWrapper: React.FC = () => (
  <InitDataProvider>
    <TotalProducts />
    <TotalCategories />
    <div className="box box4">
      <ProductsByCategory />
    </div>
  </InitDataProvider>
);

export default ProductsWrapper;

