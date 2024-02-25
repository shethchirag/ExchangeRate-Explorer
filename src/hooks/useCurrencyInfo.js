import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
        );

        // Ensure the request was successful
        if (!response.ok) {
          throw new Error(`Error fetching currency data for ${currency}`);
        }

        const jsonData = await response.json();
        setData(jsonData[currency]);
      } catch (error) {
        console.error("Error fetching currency info:", error);
      }
    };

    fetchData();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
