import { useState, useEffect, useCallback } from "react";
import { ConfigProvider, Card, Button, Input, Drawer, theme } from "antd";
import { useHistoryContext } from "../context/HistoryContext";

function Calculator() {
  const [input, setInput] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const { history, addHistory, clearHistory } = useHistoryContext();

  const handleClick = (value: string) => setInput((prev) => prev + value);

  const handleEqual = useCallback(() => {
    try {
      const result = eval(input);
      addHistory(`${input} = ${result}`);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  }, [input, addHistory]);

  const handleClear = () => setInput("");
  const handleClearHistory = () => clearHistory();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const allowedKeys = "0123456789+-*/.=EnterBackspace";
      if (!allowedKeys.includes(e.key)) return;

      if (e.key === "Enter" || e.key === "=") {
        handleEqual();
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else {
        setInput((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEqual]);

  const handleHistoryClick = (h: string) => {
    const expression = h.split("=")[0].trim();
    setInput(expression);
    setOpenDrawer(false);
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
          backgroundColor: "#222229ff",
        }}
      >
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Calculator</span>
              <Button type="link" onClick={() => setOpenDrawer(true)}>
                History
              </Button>
            </div>
          }
          style={{
            width: 320,
            textAlign: "center",
            backgroundColor: "#0e0e12ff",
            color: "white",
            borderRadius: 16,
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          }}
        >
          <Input
            value={input}
            readOnly
            style={{
              marginBottom: 10,
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              textAlign: "right",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
            }}
          >
            {[
              "7", "8", "9", "/", "4", "5", "6", "*",
              "1", "2", "3", "-", "0", ".", "=", "+",
            ].map((item) => (
              <Button
                key={item}
                type={item === "=" ? "primary" : "default"}
                onClick={() =>
                  item === "=" ? handleEqual() : handleClick(item)
                }
              >
                {item}
              </Button>
            ))}
          </div>

          <Button danger block style={{ marginTop: 10 }} onClick={handleClear}>
            Clear
          </Button>
        </Card>

        <Drawer
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>History</span>
              <Button danger size="small" onClick={handleClearHistory}>
                Clear All
              </Button>
            </div>
          }
          placement="right"
          width={300}
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          bodyStyle={{ backgroundColor: "#1d1d20ff", color: "#fff" }}
        >
          {history.length > 0 ? (
            history
              .slice()
              .reverse()
              .map((h, i) => (
                <div
                  key={i}
                  onClick={() => handleHistoryClick(h)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 0",
                    borderBottom: "1px solid #444",
                    color: "#ddd",
                  }}
                >
                  {h}
                </div>
              ))
          ) : (
            <div style={{ color: "#999" }}>No history yet</div>
          )}
        </Drawer>
      </div>
    </ConfigProvider>
  );
}

export default Calculator;
