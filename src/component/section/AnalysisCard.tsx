import ExpCard from "../Card";

function formatNumberWithCommas(number: number, locale = "en-US") {
  let tmp = "";
  let tmpNumber = number;
  if (tmpNumber >= 1000000000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000000000) / 1000;
    tmp = "P";
  } else if (tmpNumber >= 1000000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000000) / 1000;
    tmp = "T";
  } else if (tmpNumber >= 1000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000) / 1000;
    tmp = "G";
  } else if (tmpNumber >= 1000000) {
    tmpNumber = Math.floor(tmpNumber / 1000) / 1000;
    tmp = "M";
  } else if (tmpNumber >= 1000) {
    tmpNumber = tmpNumber / 1000;
    tmp = "K";
  }

  return new Intl.NumberFormat(locale).format(tmpNumber) + " " + tmp;
}

const AnaylsisCard = ({ tapUnit = 1, gdp = 0, passive = 0 }) => {
  return (
    <div className="flex flex-col-3 sm:gap-1 md:gap-2 lg:gap-3">
      <ExpCard earn="Earn per tap" profit={`+${tapUnit}`} flag={true} />
      <ExpCard
        earn="Passive Earning"
        profit={`+${passive * 3600}/h`}
        flag={true}
      />
      <ExpCard
        earn="Total Earning"
        profit={`+${formatNumberWithCommas(gdp)}`}
        flag={true}
      />
    </div>
  );
};

export default AnaylsisCard;
