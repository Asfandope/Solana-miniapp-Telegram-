import { useState } from "react";
import { formatNumberWithCommas } from "../store";
import Modal from "./Modal";

const RankingItem: React.FC<RankingItemProps> = ({ index, data, username }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex ${index > 0 && "my-2"} px-1 py-2 items-center ${
          username !== data.username
            ? "bg-[#363636] hover:bg-[#5f5f5f]"
            : "bg-[#54706f] hover:bg-[#383f3f]"
        }  border-l-[#ffb14a] border-l-[4px] border-transparent rounded-xl gap-2 opacity-0 transition-opacity duration-500 delay-1000 ease-in-out`}
        style={{ animation: `fadeIn  ${index / 6}s forwards` }} 
        onClick={handleClick}
      >
        <div className="text-xl text-start w-[20%] font-sans text-[#eeeeee] font-bold flex justify-center align-middle">
          {index == 0 ? (
            <img src="image/crown.png" alt="" width={30} height={30} />
          ) : index == 1 ? (
            <img src="image/trophy.png" alt="" width={30} height={30} />
          ) : index == 2 ? (
            <img src="image/star.png" alt="" width={30} height={30} />
          ) : (
            index + 1
          )}
        </div>
        <div className="relative overflow-hidden h-10 w-[50%] flex items-center justify-start gap-2 ">
          <img
            src="/image/add-friend.png"
            alt="avatar"
            className="w-8 h-8 rounded-xl"
          />
          <p className="text-md text-start font-sans overflow-hidden text-[#eeeeee] font-bold">
            {data.username}
          </p>
        </div>
        <p className="text-md text-end pr-3 w-[30%] font-sans text-[#eeeeee] font-bold">
          {formatNumberWithCommas(data.totalPoint)}
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center align-middle gap-3">
          <div className="flex flex-col gap-4 items-center">
            <img
              src="/image/Bitmap3.png"
              alt="avatar"
              className=" w-8 h-8 rounded-md"
            />
            <h1 className="text-2xl font-sans  text-[#eeeeee] font-bold">
              {data.username}
            </h1>
          </div>
          <p className=" text-sm font-sans  text-[#eeeeee] font-bold">
            level&nbsp;{data.level}
          </p>
          <div className="flex items-center">
            <img src="image/dollar.png" alt="" className=" w-4 h-4" />
            &nbsp;
            <h1 className="font-sans  text-[#eeeeee] font-bold text-sm">
              {data.totalPoint}
            </h1>
          </div>
          <div
            className="w-full h-9 bg-indigo-600 font-sans  text-[#eeeeee] font-bold rounded-[20px] flex justify-center items-center"
            onClick={handleCloseModal}
          >
            <span className="flex justify-center items-center">OK</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RankingItem;

interface RankingItemProps {
  index: number; // The target date as a string
  data: any;
  username: string;
}
