import { useEffect, useState } from "react";
import EarnCard from "../component/EarnCard";
import { dispatch, useSelector } from "../store";
import { updateBalance } from "../store/reducers/wallet";
import axios from "../utils/api"
// import { CreateEffect } from "../component/MoneyUpdateEffect";
import { toast } from "react-toastify";

const Earn = () => {
  
  const username_state = useSelector((state) => state.wallet.user?.username);
  const balance_state = useSelector((state) => state.wallet.user?.balance);
  const dailyEarnTime = useSelector(
    (state) => state.wallet.user?.dailyEarnTime
  );
  const [username, setUsername] = useState<string>(username_state);
  const [balance, setBalance] = useState<number>(balance_state);
  const [joinTg, setJoinTg] = useState(false);
  const [followX, setFollowX] = useState(false);
  const [joinYoutube, setJoinYoutube] = useState(false);

  const DAY = 86400 * 1000;
  const [targetDate, setTargetDate] = useState<number>(dailyEarnTime + DAY);

  useEffect(() => {
    setUsername(username_state);
    setBalance(balance_state);
  }, [username_state, balance_state]);

  useEffect(() => {
    const setTaskFlags = async () => {
      const res = await axios.post(`/earnings/${username}`);
      setJoinTg(res.data.joinTelegram.earned);
      setFollowX(res.data.followTwitter.earned);
      setJoinYoutube(res.data.joinYoutube.earned);
    }
    setTaskFlags();
  }, []);
  
  const handleGetDailyEarning = async () => {
    try {
      await axios.post(`/wallet/getDailyEarn/${username}`).then((res) => {
        if (res.status === 200) {
          dispatch(updateBalance(username, balance + 1000));
          toast.success("You have received +1000 daily Earning successfully!");
          setTargetDate(Date.now() + DAY);
        } else
          toast.info(
            "You earned already today's daily earnings! Please try tomorrow."
          );
      });
    } catch (error) {
      // console.log(error);/
      toast.warning("Unknown error occurred. Please try again later.");
    }
  };

  const handleJoinTelegramGroup = async () => {
    try {
      const webapp = (window as any).Telegram.WebApp;
      if(!webapp || joinTg)
        return;
      webapp.openLink("https://t.me/hyenagame");
      if (!joinTg) {
        dispatch(updateBalance(username, balance + 1000)).then(() => {
          axios.post(`/earnings/update/joinTelegram/${username}`, {
            status: true,
            earned: true,
        });
        setJoinTg(true);
        toast.success("You have received +1000 coins successfully!");
        });
      }
    } catch (error) {
      toast.warning("Unknown error occurred. Please try again later.");
      // console.log(error);
    }
  };

  const handleFollowTwitter = async () => {
    try {
      const webapp = (window as any).Telegram.WebApp;
      if(!webapp || followX)
        return;
      webapp.openLink("https://x.com/Laughinghy68824");
      if (!followX) {
        dispatch(updateBalance(username, balance + 1000)).then(() => {
          axios.post(`/earnings/update/followTwitter/${username}`, {
            status: true,
            earned: true,
          });
        setFollowX(true);
        toast.success("You have received +1000 coins successfully!");
        });
      } else {
        toast.warning("You have already received bonus!");
      }
    } catch (error) {
      toast.warning("Unknown error occurred. Please try again later.");
      // console.log(error);
    }
  };

  const handleJoinYoutube = async () => {
    try {
      const webapp = (window as any).Telegram.WebApp;
      if(!webapp || joinYoutube)
        return;
      webapp.openLink("https://www.youtube.com/@Laughinghy");
      if (!joinYoutube) {
        dispatch(updateBalance(username, balance + 1000)).then(() => {
          axios.post(`/earnings/update/joinYoutube/${username}`, {
            status: true,
            earned: true,
          });
        setJoinYoutube(true);
        toast.success("You have received +1000 coins successfully!");
        });
      } else {
        toast.warning("You have already received bonus!");
      }
    } catch (error) {
      toast.warning("Unknown error occurred. Please try again later.");
      // console.log(error);
    }
  };

  // const handleSubscribeTelegramChannel = async () => {
  //   try {
  //     await axios.post(`/earnings/${username}`).then((res) => {
  //       if (res.data.subscribeTelegram.status) {
  //         if (!res.data.subscribeTelegram.earned) {
  //           dispatch(updateBalance(username, balance + 1000)).then(() => {
  //             axios.post(`/earnings/update/subscribeTelegram/${username}`, {
  //               status: true,
  //               earned: true,
  //             });
  //             toast.success("You have received +1000 coins successfully!");
  //           });
  //         } else {
  //           toast.warning("You have already received bonus!");
  //         }
  //       } else {
  //         toast.warning(
  //           "You didn't subscribe Telegram Channel yet! Please join again"
  //         );
  //       }
  //     });
  //   } catch (error) {
  //     // console.log(error);
  //     toast.warning("Unknown error occurred. Please try again later.");
  //   }
  // };

  return (
    <div className="py-10 bg-black p-4 pb-24">
      <div className="flex justify-center items-center">
        <img src="image/dollar.png" className="w-32 h-32" />
      </div>
      <p className="text-white text-3xl font-bold p-4">Earn More Money</p>
      <p className="text-white text-xl font-bold p-4 text-left">Daily tasks</p>
      <div className="py-3">
        <EarnCard
          title="Daily reward"
          image="image/cdollar.png"
          profit="1K"
          flag={false}
          timer={true}
          targetDate={targetDate}
          onClick={handleGetDailyEarning}
        />
      </div>
      <div className="flex flex-row justify-between items-center py-2">
        <p className="text-left py-2 text-white text-xl font-semibold">
          Tasks List
        </p>
      </div>
      <div className="mt-3 space-y-2">
        <EarnCard
          title="Join our TG channel"
          image="image/tg.png"
          profit="1K"
          flag={joinTg}
          onClick={handleJoinTelegramGroup}
        />
        <EarnCard
          title="Follow our X account"
          image="image/x.png"
          profit="1K"
          flag={followX}
          onClick={handleFollowTwitter}
        />
        <EarnCard
          title="Join our Youtube Channel"
          image="image/youtube.png"
          profit="1K"
          flag={joinYoutube}
          onClick={handleJoinYoutube}
        />
      </div>
    </div>
  );
};
export default Earn;
