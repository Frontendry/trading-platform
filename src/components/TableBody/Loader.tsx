import "./Loader.css";

const Loader = () => {
  return (
    <div className="flex items-center">
      <div className="text-white text-center w-full">
        <div className="lds-facebook">
          <div className="bg-indigo-300"></div>
          <div className="bg-indigo-300"></div>
          <div className="bg-indigo-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
