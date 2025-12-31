import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Input, Select, ConfigProvider, theme, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";

const { Option } = Select;

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://open.er-api.com/v6/latest/USD");
        const data = response.data;
        if (data && data.rates) {
          setCurrencies(Object.keys(data.rates));
        } else {
          message.error("Failed to load currency data.");
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
        message.error("Error fetching currency data.");
      }
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!amount) {
      message.warning("Please enter an amount first!");
      return;
    }

    setIsConverting(true);
    try {
      const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      if (rate) {
        const converted = (parseFloat(amount) * rate).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
      } else {
        message.error("Conversion rate not found.");
      }
    } catch (error) {
      console.error(error);
      message.error("Conversion failed. Please try again.");
    } finally {
      setIsConverting(true);
    }
  };

 
  const handleInputChange = (value: string) => {
    setAmount(value);
    setIsConverting(false);
  };

  const handleFromChange = (value: string) => {
    setFromCurrency(value);
    setIsConverting(false);
  };

  const handleToChange = (value: string) => {
    setToCurrency(value);
    setIsConverting(false);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setIsConverting(false);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 12,
          fontSize: 16,
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#222229",
        }}
      >
        <Card
          title="Currency Converter"
          style={{
            width: 340,
            backgroundColor: "#0e0e12",
            color: "white",
            borderRadius: 16,
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          }}
        >
          <Input
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => handleInputChange(e.target.value)}
            style={{
              marginBottom: 10,
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              textAlign: "right",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Select
              value={fromCurrency}
              onChange={handleFromChange}
              style={{ flex: 1 }}
              showSearch
            >
              {currencies.map((cur) => (
                <Option key={cur} value={cur}>
                  {cur}
                </Option>
              ))}
            </Select>

            <Button
              icon={<SwapOutlined />}
              onClick={handleSwap}
              style={{
                backgroundColor: "#1677ff",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                height: 38,
              }}
            />

            <Select
              value={toCurrency}
              onChange={handleToChange}
              style={{ flex: 1 }}
              showSearch
            >
              {currencies.map((cur) => (
                <Option key={cur} value={cur}>
                  {cur}
                </Option>
              ))}
            </Select>
          </div>

          <Button
            type="primary"
            block
            onClick={handleConvert}
            disabled={isConverting} 
          >
            {isConverting ? "Converted" : "Convert"}
          </Button>

          {result && (
            <Card
              style={{
                marginTop: 15,
                textAlign: "center",
                backgroundColor: "#1d1d20",
                color: "white",
                borderRadius: 10,
              }}
            >
              {result}
            </Card>
          )}
        </Card>
      </div>
    </ConfigProvider>
  );
}

export default CurrencyConverter;
