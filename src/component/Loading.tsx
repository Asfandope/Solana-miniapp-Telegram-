import "./Loading.css";
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loadingspinner">
        <div
          id="square1"
          style={{
            backgroundImage: "url('image/load1.png')",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          id="square2"
          style={{
            backgroundImage: "url('image/load2.png')",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          id="square3"
          style={{
            backgroundImage: "url('image/load3.png')",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          id="square4"
          style={{
            backgroundImage: "url('image/load4.png')",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          id="square5"
          style={{
            backgroundImage: "url('image/load5.png')",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
