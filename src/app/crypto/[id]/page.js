"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Card from "@/app/components/modules/Card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Crypto = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("7");

  // === Chart Data Load ===
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${timeframe}`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          const formatted = data.map(([time, open, high, low, close]) => ({
            x: new Date(time).getTime(),
            y: [open, high, low, close],
          }));
          setChartData(formatted);
        }
      } catch (err) {
        console.error("خطا در دریافت داده‌های چارت:", err);
      }
    };

    fetchChartData();
  }, [id, timeframe]);

  // === Coin Info Live ===
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        setCoinData(data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کوین:", err);
      }
    };

    fetchCoinData();

    const interval = setInterval(fetchCoinData, 15000); 
    return () => clearInterval(interval);
  }, [id]);

  if (!coinData) return <div className="w-full h-full text-white text-[60px] flex justify-center items-center p-4">Loading...</div>;

  const price = coinData.market_data.current_price.usd;
  const priceChange = coinData.market_data.price_change_percentage_24h;
  const changeColor = priceChange > 0 ? "text-green-400" : "text-red-400";

  const timeframes = [
    { label: "1D", value: "1" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "3M", value: "90" },
    { label: "1Y", value: "365" },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: true },
      zoom: { enabled: true, type: "x", autoScaleYaxis: true },
    },
    title: {
      text: `${coinData.name} Candlestick Chart`,
      align: "left",
      style: { color: "#fff" },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "#ccc" },
        datetimeUTC: false,
      },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#ccc" } },
    },
    theme: {
      mode: "dark",
    },
  };

  return (
    <div className="w-full flex justify-center gap-10 items-center flex-col p-4">
      <div className="p-4 bg-[var(--header)] w-full text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{coinData.name}</h2>
        <span className={`text-4xl font-semibold ${changeColor}`}>
          ${price.toLocaleString()}
        </span>
        <p className={`text-sm ${changeColor} mb-4`}>
          {priceChange.toFixed(2)}%
        </p>

        <div className="flex gap-2 mb-4">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1 rounded-md cursor-pointer text-xs font-medium border transition-colors duration-200 ${
                timeframe === tf.value
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-orange-500 hover:text-white"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        <Chart
          options={options}
          series={[{ data: chartData }]}
          type="candlestick"
          height={350}
        />
      </div>

      <Card
        title={"About"}
        data={
          <div className="p-4 text-white text-sm flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <strong>Symbol:</strong> {coinData.symbol.toUpperCase()}
            </div>
            <div className="w-full flex justify-between">
              <strong>Hashing Algorithm:</strong> {coinData.hashing_algorithm || "N/A"}
            </div>
            <div className="w-full flex justify-between">
              <strong>Market Cap:</strong> ${coinData.market_data.market_cap.usd.toLocaleString()}
            </div>
            <div className="w-full flex justify-between">
              <strong>Total Volume:</strong> ${coinData.market_data.total_volume.usd.toLocaleString()}
            </div>
            <p className="w-full flex justify-between text-justify">
              {coinData.description.en?.slice(0, 500) || "No description available."}
            </p>
          </div>
        }
      />
    </div>
  );
};

export default Crypto;
