import { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer, ConfigProvider, theme } from "antd";
import { MenuOutlined, CalculatorOutlined, DollarOutlined } from "@ant-design/icons";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Calculator from "./components/Calculator";
import CurrencyConverter from "./components/CurrencyConverter";

const { Header, Content } = Layout;

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 
  useEffect(() => {
    if (location.pathname === "/calculator" || location.pathname === "/") {
      document.title = "Calculator";
    } else if (location.pathname === "/currency") {
      document.title = "Currency Exchange";
    }
  }, [location]);

  const menuItems = [
    { key: "calculator", label: "Calculator", icon: <CalculatorOutlined />, path: "/calculator" },
    { key: "currency", label: "Currency Exchange", icon: <DollarOutlined />, path: "/currency" },
  ];

  const handleMenuClick = (key: string) => {
    const item = menuItems.find((m) => m.key === key);
    if (item) {
      navigate(item.path);
      setOpenDrawer(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1323a07d",
          borderRadius: 12,
          fontSize: 16,
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: "#22223582" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#0e0e12",
            color: "white",
            padding: "0 20px",
          }}
        >
          <h2 style={{ color: "#fff", margin: 0 }}>Mathematical</h2>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 22, color: "#fff" }} />}
            onClick={() => setOpenDrawer(true)}
          />
        </Header>

        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          bodyStyle={{ background: "#1d1d20", padding: 0 }}
        >
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => handleMenuClick(item.key),
            }))}
          />
        </Drawer>

        <Content style={{ padding: "30px", background: "#222229" }}>
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/currency" element={<CurrencyConverter />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
