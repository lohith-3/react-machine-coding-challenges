// https://api.frankfurter.app/latest?amount=100&from=USD&to=INR

import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);

  console.log(convertedAmount);

  useEffect(() => {
    if (!amount) {
      setConvertedAmount(0);
      return;
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    const convertAmount = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        if (!res.ok) throw new Error(`Error while converting currency..`);

        const data = await res.json();

        setConvertedAmount(data.rates[toCurrency]);
      } catch (err) {
        console.error(err.message);
      }
    };

    convertAmount();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="currency-container">
        <label form="amount">Enter the Amount:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p>
        {convertedAmount > 0 &&
          `Currency conversion for the amount ${amount} (${fromCurrency}) to
        ${toCurrency} is ${convertedAmount}`}
      </p>
    </div>
  );
}

export default App;
