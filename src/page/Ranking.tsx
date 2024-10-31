import { useEffect, useState } from "react";
import RankingList from "../component/RankingList";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
import LoadingComponent from "../component/LoadingComponent";

export default function Ranking() {
  const users_state = useSelector((state) => state?.wallet?.users);
  const username = useSelector((state) => state.wallet.user?.username);

  const [usersa, setUsers] = useState(users_state);
  // const [userRank, setUserRank] = useState<number>(1);

  useEffect(() => {
    setUsers(users_state);
  }, [users_state]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(getAllUsers());
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const findUserRank = (username: string) => {
    for (let i = 0; i < usersa.length; i++)
      if (usersa[i].username === username) return i + 1;
  };

  const findUserGDP = (username: string) => {
    for (let i = 0; i < usersa.length; i++)
      if (usersa[i].username === username) return usersa[i].totalPoint;
  };

  return (
    <div className="Ranking max-w-full mx-auto text-white !h-full">
      <div className="flex flex-col w-full items-ceter gap-2  px-3 pt-10 justify-between">
        <div className="flex flex-row justify-between mb-3">
          <div className="overflow-hidden h-10 flex items-center gap-2 ">
            <img
              src="/image/wolftoken.jpeg"
              alt="avatar"
              className="w-10 h-10 rounded-xl aspect-[1/1]"
            />
            <p className="text-2xl text-start font-sans overflow-hidden text-[#eeeeee] font-bold">
              {username}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="text-md  justify-end pr-4 font-sans text-[#eeeeee] font-bold flex items-center">
              {findUserRank(username)} th
            </div>
            <div className="flex items-center gap-1">
              <img
                src="/image/dollar.png"
                alt="avatar"
                className="w-6 h-6 rounded-xl"
              />
              <p className="text-md  text-end pr-4 w-[50%] font-sans text-[#eeeeee] font-bold">
                {findUserGDP(username)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex px-3 py-3 text-white text-lg font-bold justify-start align-middle overflow-y-hidden   rounded-lg shadow-md shadow-gray-400 mb-5">
          <div className="text-start w-[20%] flex justify-center text-md">
            Rank
          </div>
          <div className="text-start w-[40%] flex justify-center text-md">
            User
          </div>
          <div className="text-start w-[60%] flex justify-end pr-4 text-md">
            Total Score
          </div>
        </div>
      </div>

      {users_state.length ? (
        // <div className="overflow-y-scroll">
          <RankingList usersa={usersa} username={username} />
        // </div>
      ) : (
        <div className="flex items-center justify-center h-[300px]">
          <LoadingComponent />
        </div>
      )}
    </div>
  )
}
