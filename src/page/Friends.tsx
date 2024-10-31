import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";
// import { initUtils } from "@telegram-apps/sdk";
import { useSelector } from "../store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/api"
import { CopyToClipboard } from "react-copy-to-clipboard";

const Friends = () => {
  // const utils = initUtils();
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  const [friends, setFriends] = useState<any[]>([]);
  const [viewFriends, setViewFriends] = useState<any[]>([]);

  const [textToCopy, setTextToCopy] = useState<string>("");
  // const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setUsername(username_state);
    setTextToCopy(`https://t.me/hyenat2ebot?start=${username_state}`);
  }, [username_state]);

  const handleCopy = async () => {
    toast.success("Copied to clipboard!");
  };
  useEffect(() => {
    if (username) {
      axios.post(`/friend/${username}`).then((res) => {
        setFriends(res.data);
      });
    }
  }, []);
  useEffect(() => {
    setViewFriends(friends ? friends : []);
  }, [friends]);

  return (
    <div className=" bg-black px-4 pb-24 pt-4">
      <p className="text-white text-xl">Invite Friends!</p>
      <p className="text-white text-3xl pt-4 pb-6 font-bold">
        Refer friends and earn extra points!
      </p>
      <div className="space-y-2 py-3">
        <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
          <div>
            <InviteCard title="Invite a friend" profit="1,000" />
          </div>
        </CopyToClipboard>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-left py-2 text-white text-xl font-semibold">
          List of your friends({ viewFriends.length })
        </p>
        <img
          src="/image/redo.png"
          alt=""
          className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 mt-1"
        />
      </div>
      <div className="mt-3 space-y-2">
        {
          viewFriends.length > 0 ?
          viewFriends.map(it => (
            <FriendCard
              name={it.friend}
              role="Platium"
              profit="495.3K"
              value="+321K"
            />
          ))
          : 
          <div className="flex h-[180px] items-center justify-center">
            There are no friends.
          </div>
        }
      </div>
    </div>
  );
};
export default Friends;
