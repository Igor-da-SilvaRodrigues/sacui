const WaterMark = () => {
  return (
    <div>
      <img
        src="./logo-cefet.svg"
        style={{
          zIndex: "-1",
          position: "fixed",
          opacity: 0.06,
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default WaterMark;
