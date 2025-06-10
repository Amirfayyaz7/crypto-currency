"use client";
import Image from "next/image";

const ListCrypto = ({
  currentPrice,
  totalPrice,
  name,
  logo,
  profit,
  type,
  onclick,
}) => {
  const profitColor =
    type === "green"
      ? "text-green-500"
      : type === "red"
      ? "text-red-500"
      : "text-yellow-400";

  return (
    <div
      className="w-[100%] h-[250px] flex flex-col justify-between bg-[var(--header)] items-center cursor-pointer hover:bg-[#313a4d] rounded-[6px] hover:duration-200 hover:transition-all p-4 "
      onClick={onclick}
    >
      <div className="flex flex-col justify-center gap-2 items-center">
        <div className="w-10 h-10 rounded-full flex justify-center items-center">
          <Image src={logo} alt="logo" width={32} height={32} />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <span className="text-white text-[14px] text-center">{name}</span>
          <span className={`${profitColor} text-[15px]`} dir="ltr">
            {profit}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-centert items-center">
        <span className="text-white text-xl">{currentPrice}</span>
        <span className="text-gray-400 text-[15px]">{totalPrice}</span>
      </div>
    </div>
  );
};

export default ListCrypto;
