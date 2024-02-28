import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import Header from "./components/Header";
import CurrencyTable from "./components/CurrencyTable";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [allConversions, setAllConversions] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const validateAmount = (value) => {
    return !isNaN(value) && parseFloat(value) > 0;
  };

  const convert = () => {
    const allConversions = {};
    for (const currency of Object.keys(currencyInfo)) {
      const convertedValue = (amount * currencyInfo[currency]).toFixed(5);
      allConversions[currency] = parseFloat(convertedValue).toString();
    }
    setConvertedAmount(allConversions[to]);
    setAllConversions(allConversions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAmount(amount)) {
      convert();
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="grid-container">
          <div className="card grid-item">
            <form onSubmit={handleSubmit}>
              <InputBox
                label="Enter Amount"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setFrom(currency);
                }}
                selectCurrency={from}
                onAmountChange={(amount) => {
                  setAmount(amount);
                }}
              />
              <InputBox
                label="Converted Amount"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => {
                  setTo(currency);
                }}
                selectCurrency={to}
                amountDisable
              />
              <button
                className="styled-button InputDiv"
                type="submit"
                disabled={!validateAmount(amount) || !from}
              >
                {`Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
              </button>
            </form>
          </div>
          {Object.keys(allConversions).length === 0 ? (
            <div
              className="card grid-item"
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "20px",
                  textAlign: "center",
                  marginTop: "10rem",
                }}
              >
                Please Convert an Amount to view the Exchange Rates Table
              </p>
            </div>
          ) : (
            <div className="card grid-item">
              <p>{from.toUpperCase()} EXCHANGE RATES TABLE</p>
              <CurrencyTable allConversions={allConversions} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
