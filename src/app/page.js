"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbSpeakerphone } from "react-icons/tb";
import ListCrypto from "@/app/components/modules/ListCrypto";

const HomePage = () => {
  const router = useRouter();
  const [coins, setCoins] = useState([]);

  const goToCrypto = (id) => {
    router.push(`/crypto/${id}`);
  };

  const getData = async () => {
    try {
      
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      );
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات:", error);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full gap-4 flex justify-center items-center flex-col p-4">
      

      <div className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 rounded-lg shadow-sm items-center">
        {coins.map((coin) => {
          const change = coin.price_change_percentage_24h;
          const type =
            change > 0.5 ? "green" : change < -0.5 ? "red" : "yellow";

          return (
            <ListCrypto
              key={coin.id}
              onclick={() => goToCrypto(coin.id)}
              type={type}
              currentPrice={`$${coin.current_price.toFixed(2)}`}
              totalPrice={`$${coin.market_cap.toLocaleString()}`}
              name={coin.name}
              logo={coin.image}
              profit={`${change?.toFixed(2)}%`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
