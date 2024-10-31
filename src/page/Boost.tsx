import { useEffect, useRef, useState } from "react";
import { dispatch, useSelector } from "../store";
import { buyBonusCard, updateBalance, updateEnergy } from "../store/reducers/wallet";
import { toast } from "react-toastify";
import { CreateEffect } from "../component/MoneyUpdateEffect";
import Modal from "../component/Modal";

export default function Boost() {
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const username_state = useSelector((state) => state.wallet.user?.username);
  const limit_state = useSelector((state) => state.wallet.user?.limit);
  const tap_state = useSelector((state) => state.wallet.user?.tap);

  const [token, setToken] = useState<number>(tokenState);
  const [username, setUsername] = useState<string>(username_state);
  const [limit, setLimit] = useState<number>(limit_state);
  const [tap, setTap] = useState<number>(tap_state);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(tap);
    setToken(tokenState);
    setUsername(username_state);
    setLimit(limit_state);
    setTap(tap_state);
  }, [tokenState, username_state, limit_state, tap_state]);

  const handleFullEnergy = () => {
    dispatch(updateEnergy(username, limit));
    toast.success("Successfully updated energy!");
    setIsModalOpen(false);
  };
  
  const handleFillEnergyClick = () => {
    setIsModalOpen(true);
  };

  const handleBonusClick = () => {
    try {
      if (token < 1000) {
        toast.error(
          "There isn't enough tokens. You need 1000 tokens to purchase a card. Please check your"
        );
        return;
      }
      dispatch(buyBonusCard(username, token - 1000));
      dispatch(updateBalance(username, token - 1000));
      setIsBonusModalOpen(false);
      // toast.success("Successfully purchase card.");
      CreateEffect(bodyRef, 1000, "", "70%", "100px");
    } catch (error) {
      toast.error("Unknown error occurred. Please try again later.");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isBonusModalOpen, setIsBonusModalOpen] = useState<boolean>(false);
  const handleMouseBonusClick = () => {
    setIsBonusModalOpen(true);
  };
  const handleCloseBonusModal = () => {
    setIsBonusModalOpen(false);
  };

  return (
    <div className="Boost max-w-full mx-auto text-white h-[75vh] max-sm:h-[82vh] mt-8">
      <div className="md:w-full h-[65vh] mx-auto flex flex-col justify-center ">
        <h1 className="text-3xl mb-3  max-w-[500px] mx-auto text-start text-white flex justify-center">
          Your Balance
        </h1>
        <div className="flex px-3 py-1 gap-5 text-white text-lg font-bold justify-center align-middle overflow-y-hidden">
          <img src="/image/dollar.png" alt="" className="w-10 h-10" />
          <h1 className="text-4xl">{ token }</h1>
        </div>
        <hr className="my-3 border-[#363636] border-1" />
        <div className="flex justify-start">
          <h1 className="text-white text-xl">Free daily boosters</h1>
        </div>
        <div
          className={`flex my-3 px-5 py-3 items-center bg-[#4d4d4c] rounded-[30px] hover:bg-[#3a3a3a]`}
          onClick={handleFillEnergyClick}
        >
          <img src="/image/icon/lightning.svg" alt="" className="w-10 h-10" />
          <div className="flex flex-col">
            <h3 className="text-2xl text-white">Full energy</h3>
            <h3 className="text-xl text-[#a8a8a7]">1/1 available</h3>
          </div>
        </div>
        <div className="flex justify-start">
          <h1 className="text-white text-xl">Boosters</h1>
        </div>
        <div
          className={`flex my-3 px-5 py-3 items-center bg-[#4d4d4c] rounded-[30px] gap-2 hover:bg-[#3a3a3a]`}
          onClick={handleMouseBonusClick}
        >
          <img src="/image/turbo.png" alt="" className="w-10 h-10" />
          <div className="flex flex-col">
            <h3 className="text-2xl text-white text-left">Passive Earnings</h3>
            <h3 className="text-xl text-[#a8a8a7]">1k necessary</h3>
          </div>
        </div>
        {/* <div
          className={`flex my-3 px-5 py-3 items-center bg-[#4d4d4c] rounded-[30px] gap-2 hover:bg-[#3a3a3a]`}
        >
          <img src="/image/double-tap.png" alt="" className="w-10 h-10" />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl text-white text-left">Multitap</h3>
            <div className="flex gap-3 align-middle">
              <img src="/image/dollar.png" alt="" className="w-5 h-5" />
              <h3>2K * 2M</h3>
            </div>
          </div>
        </div> */}
        {/* <div
          className={`flex my-3 px-5 py-3 items-center bg-[#4d4d4c] rounded-[30px] gap-2 hover:bg-[#3a3a3a]`}
        >
          <img src="/image/battery.png" alt="" className="w-10 h-10" />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl text-white text-left">Energy limit</h3>
            <div className="flex gap-3 align-middle">
              <img src="/image/dollar.png" alt="" className="w-5 h-5" />
              <h3>2K * 2M</h3>
            </div>
          </div>
        </div> */}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center align-middle gap-3">
          <img src="image/icon/lightning.svg" alt="" className=" w-12 h-12" />
          <h1 className="text-xl text-white">Full energy</h1>
          <p className=" text-sm text-white">
            Recharge your energy to the maximum and do another round of mining
          </p>
          <div className="flex items-center gap-4">
            <img src="image/dollar.png" alt="" className=" w-8 h-8" />
            <h1 className="text-white text-2xl">FREE</h1>
          </div>
          <div
            className="w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center"
            onClick={handleFullEnergy}
          >
            <span className="flex justify-center items-center">Go ahead</span>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isBonusModalOpen} onClose={handleCloseBonusModal}>
        <div className="flex flex-col items-center align-middle gap-3">
          <img src="image/bonus.png" alt="" className=" w-12 h-12" />
          <h1 className="text-2xl text-white">Passive Earning</h1>
          <p className=" text-sm text-white">
            You can get bonus coins with combo cards.
          </p>
          <div className="flex items-center gap-4">
            <img src="image/dollar.png" alt="" className=" w-8 h-8" />
            <h1 className="text-white text-2xl">&nbsp;-1000</h1>
          </div>
          <div
            className="w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center"
            onClick={handleBonusClick}
          >
            <span className="flex justify-center items-center">Buy</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
