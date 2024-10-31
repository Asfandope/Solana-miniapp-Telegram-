import { useRef } from "react";
import CountdownTimer from "./CountdownTimer";
import { CreateEffect } from "./MoneyUpdateEffect";
import { toast } from "react-toastify";

interface EarnCardProps {
  title: string;
  image: string;
  flag: boolean;
  profit: string;
  timer?: boolean;
  targetDate?: number;
  onClick?: () => void;
}
const EarnCard: React.FC<EarnCardProps> = ({ title, image, flag, profit, onClick = () => {}, timer = false, targetDate = 0 }) => {
  
  const bodyRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if(targetDate && timer) {
      const timeLeft = new Date(targetDate).getTime() - new Date().getTime();
      if(timeLeft > 0) {
        toast.info(
          "You earned already today's daily earnings! Please try tomorrow."
        );
        return;
      }
      CreateEffect(bodyRef, 1000, "ADD", "80%", "420px");
    }
    onClick();
  }
  return (
    <div className="grid grid-col-1  grid-col-1 w-full" onClick={handleClick} ref={bodyRef}>
      <div className="group rounded-xl bg-[#272A30] p-2 sm:p-3 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <div className="flex grid-cols-2 gap-3 w-full">
          <div className="my-auto w-14">
            <img src={image} alt="" className="w-12 h-12" />
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="space-y-2">
              <p className="text-white text-lg font-semibold text-left">
                {title}
              </p>
              <div className="flex items-center">
                <img src="/image/dollar.png" alt="" className="w-6 h-6 ml-1" />
                <p className="text-white ml-1">+{profit}</p>
              </div>
            </div>
            <div className="flex items-center">
              
              {timer && (
                <div className="flex absolute right-10 aspect-[1/1]">
                  <CountdownTimer targetDate={targetDate} />
                </div>
              )}
              {flag === true ? (
                <img src="/image/tick.png" alt="" className="w-8 h-8 ml-1" />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnCard;
