const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-[5rem]">
      <div className={`${step1 ? "text-dark-red-normal" : "text-gray-300"}`}>
        <span className="ml-2">Login</span>
        <div className="mt-2 text-lg text-center">🔴</div>
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-dark-red-normal"></div>}
          <div
            className={`${step1 ? "text-dark-red-normal" : "text-gray-300"}`}
          >
            <span>Shipping</span>
            <div className="mt-2 text-lg text-center">🔴</div>
          </div>
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[10rem] bg-dark-red-normal"></div>
        ) : (
          ""
        )}

        <div
          className={`${
            step3 ? "text-dark-red-normal" : "text-dark-gray"
          }`}
        >
          <span className={`${!step3 ? "ml-[10rem]" : ""}`}>Summary</span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-lg text-center">🔴</div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
};

export default ProgressSteps;
