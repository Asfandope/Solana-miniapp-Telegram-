/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AnaylsisCard from "../component/section/AnalysisCard";
import ProgressBar from "../component/ProgressBar";
import { dispatch, useSelector } from "../store";
import soundEffect from "../../public/effect/water.wav";
import axios from "../utils/api"
import { getWallet, insertWallet, updateWallet } from "../store/reducers/wallet";
import { CreateEffectForMine } from "../component/MoneyUpdateEffect";
import { isMobile } from "react-device-detect";

function Home() {
  const PassItemCount = [0, 1, 2, 3, 4, 5];
  const audio = new Audio(soundEffect);
  const usernameState = useSelector((state) => state.wallet.user?.username);
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const energyState = useSelector((state) => state.wallet.user?.energy);
  const tapState = useSelector((state) => state.wallet.user?.tap);
  const limitState = useSelector((state) => state.wallet.user?.limit);
  const totalState = useSelector((state) => state.wallet.user?.totalPoint);
  const passItemLevelState = useSelector(
    (state) => state.wallet.user?.passItemLevel
  );
  const passItemStartTimeState = useSelector(
    (state) => state.wallet.user?.passItemStartTime
  );
  const [imgStatus, setImgStatus] = useState(false);
  const [tap, setTap] = useState<number>(tapState);
  const [username, setUsername] = useState<string>(usernameState);
  const [token, setToken] = useState<number>(tokenState);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(energyState);
  const [limit, setLimit] = useState<number>(limitState);
  const [total, setTotal] = useState<number>(totalState);
  const [isTouch, setIsTouch] = useState(false); // New state to track touch event
  const [passItemStartTime, setpassItemStartTime] = useState<number>(
    passItemStartTimeState
  );
  const [passItemLevel, setpassItemLevel] =
    useState<number>(passItemLevelState);
  let miningInterval: any;

  useEffect(() => {
    // const TESTNAME = "Totchka_1803";
    // setUsername(TESTNAME);
    // dispatch(insertWallet(TESTNAME));
    // dispatch(getWallet(TESTNAME));

    // setTap(tapState);
    // setToken(tokenState);
    // setTotal(totalState);

    // setRemainedEnergy(energyState);
    // setpassItemStartTime(passItemStartTimeState);

    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    console.log("=========>webapp", webapp);
    if (webapp && webapp["user"]) {
      setUsername(webapp["user"]["username"]);
      axios.post(`/earnings/add`, { username: webapp["user"]["username"] });
      dispatch(insertWallet(webapp["user"]["username"]));
      dispatch(getWallet(webapp["user"]["username"])).then(() => {
        setTap(tapState);
        setToken(tokenState);
        setRemainedEnergy(energyState);
      });
    }

    if (passItemLevelState) {
      miningInterval = setInterval(() => {
        // console.log("passive mining +", passItemLevel);
        setToken((prevToken) => {
          const tmp = prevToken + PassItemCount[passItemLevel];
          return tmp;
        });

        setTotal((prevTotal) => {
          const tmp = prevTotal + PassItemCount[passItemLevel];
          return tmp;
        });
      }, 1000); // Mine every second
      return () => {
        clearInterval(miningInterval);
      };
    }
  }, []);

  // this will not used
  if (total == -1) {
    setpassItemStartTime(1);
    console.log(passItemStartTime);
    setpassItemLevel(-1);
  }
  useEffect(() => {
    setLimit(limitState);
  }, [limitState]);

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const bodyRef = useRef<HTMLDivElement>(null);
  // const [score, setScore] = useState<string>("+1"); 
  
  const handleTapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left + "px";
    const y = event.clientY - rect.top + "px";

    CreateEffectForMine(bodyRef, "ADD", x, y);
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left + "px";
    const y = event.clientY - rect.top + "px";

    CreateEffectForMine(bodyRef, "ADD", x, y);
  }

  const handleTouchStart = (event: TouchEvent) => {
    Array.from(event.touches).forEach((touch) => {
      console.log("Touch's current position:", touch);
      // Call handleClick for each touch point 
      handleClick({
        ...touch,
        target: event.target,
        preventDefault: () => {}, // Mock preventDefault for non-MouseEvent
        clientX: touch.clientX,
        clientY: touch.clientY
      });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainedEnergy < limit && remainedEnergy > 0) {
        // genergy generate per 1s
        // dispatch(updateEnergy(username, remainedEnergy + 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [username, remainedEnergy, limit]);
  
  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    audio.play();
    if (remainedEnergy > 0) {
      setToken(token + tap);
      setTotal(total + tap);
      dispatch(
        updateWallet(username, total + tap, token + tap, remainedEnergy - 1)
      );
      setRemainedEnergy(remainedEnergy - 1);
      handleTapClick(event);
    }
  };

  
  const handleTouch = (event: any) => {
    audio.play();
    const length = event.touches.length;
    if (remainedEnergy > 0) {
      setToken(token + tap * length);
      setTotal(total + tap * length);
      dispatch(
        updateWallet(
          username,
          total + tap * length,
          token + tap * length,
          remainedEnergy - tap * length
        )
      );
      setRemainedEnergy(remainedEnergy - 1);
      handleTouchStart(event);
    }
  };

  const handleMouseDown = () => {
    setImgStatus(true);
  };

  const handleMouseLeave = () => {
    setImgStatus(false);
  };

  return (
    <div className="pb-24 px-4">
      <AnaylsisCard
        tapUnit={1}
        gdp={total}
        passive={PassItemCount[passItemLevel]}
      />
      <div
        id="mainWindow"
        className="relative mt-2 flex flex-col items-center justify-center w-full"
      >
        <div className="flex flex-col justify-center items-center mb-7 gap-2 w-full">
          <div className="flex flex-row justify-center items-center mt-4">
            <img
              src="/image/dollar.png"
              alt=""
              className="w-14 h-14 mt-1 max-sm:w-10 max-sm:h-10"
            />
            <h1 className="text-5xl text-white ml-3 font-bold max-sm:text-3xl">
              {formatNumberWithCommas(token)}
            </h1>
          </div>
          <div className="w-full">
            <ProgressBar value={remainedEnergy / 10} />
          </div>
        </div>
        <div className="w-full sm:p-12 md:p-6 lg:p-16 px-12">
          <div
            className={`relative bg-[url('/image/wolftoken.jpeg')] rounded-full bg-cover w-full aspect-square z-10 ${
              remainedEnergy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            } ${imgStatus ? " border-[5px]" : "border-0"}`}
            ref={bodyRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onTouchStart={(e) => {
              if (!isMobile) return;
              setIsTouch(true); // Set touch flag to true
              handleTouch(e);
            }}
            onClick={(e) => {
              if (isTouch) {
                setIsTouch(false); // Reset touch flag
                return;
              }
              handleTap(e);
            }}
          />
        </div>
        <div className="flex flex-row justify-between w-full px-10 max-sm:px-4 mt-4">
          <div className="flex justify-between w-full">
            <h3 className="text-2xl mb-2 text-white flex flex-row">
              <span className="flex text-3xl items-center ">
                <img
                  src="/image/icon/lightning.svg"
                  alt="lightning"
                  className="w-6 h-6 inline mt-1"
                />
              </span>
              <span className="text-2xl text-white max-sm:text-lg">
                {remainedEnergy}/1000
              </span>
            </h3>
            <div className="flex justify-center items-center">
              <Link to="/boost" className="flex">
                <img
                  src="/image/rocket.png"
                  alt="rocket"
                  className="w-8 h-8 inline max-sm:w-6 max-sm:h-6"
                />
                <h3 className="text-2xl max-sm:text-lg text-white">Boost</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
