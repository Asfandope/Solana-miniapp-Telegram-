import RankingItem from "./RankingItem";
const RankingList: React.FC<RankingListProps> = ({ usersa, username }) => {
  return (
    <div className="md:w-full h-[60vh] mx-auto px-4 ">
      {/* <div className="overflow-auto"> */}
        {usersa.map((data: any, idx: any) => (
          <div key={idx}>
            <RankingItem index={idx} data={data} username={username} />
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};
export default RankingList;

interface RankingListProps {
  usersa: any; // The target date as a string
  username: string;
}
