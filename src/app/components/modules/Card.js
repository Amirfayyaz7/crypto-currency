const Card = ({ title, data }) => {
  return (
    <>
      <div className="w-full flex justify-center gap-2 items-center flex-col">
        <div className="w-full flex items-center">
          <span className="text-white text-[20px]">{title}</span>
        </div>
        <div className="w-full flex justify-center flex-col gap-2 bg-[var(--header)] rounded-lg shadow-sm items-center ">
          {data}
        </div>
      </div>
    </>
  );
};
export default Card;
