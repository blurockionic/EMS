import React from "react";

const ModelForm = ({ closeModel }) => {
  return (
    <div>
      <div
        className="fixed  left-0 right-0 top-0 bottom-0 max-w-[100rem]  bg-slate-400 bg-opacity-90 "
        onClick={closeModel}
      ></div>

      <div className="relative flex flex-col bg-orange-500 rounded-lg justify-evenly w-[70rem]   ">
        <div className="flex bg-white w-[90%] mx-auto rounded-lg mt-4">
          <h2 className="mx-auto text-2xl font-bold"> Creat Report</h2>
        </div>

        <form className="flex  flex-col " action="">
          {/* reprt title and date  */}
          <div className="flex w-[90%] mx-auto rounded-lg mt-4 gap-[20rem]">
            <div className="flex flex-col  ">
              <label className="text-xl font-semibold mb-1">Report Title</label>
              <input className="border rounded-lg h-[3rem]  w-[20rem] "></input>
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-semibold mb-1">Date</label>
              <input className="border rounded-lg h-[3rem]  w-[20rem] "></input>
            </div>
          </div>

          {/* description of reports */}
          <div className="mt-8 flex flex-row ">
            <label
              className="text-xl font-semibold mb-1 mx-[3.8rem]"
              htmlFor=""
            >
              Description
            </label>
            <textarea
              className="border rounded-lg"
              name=""
              id=""
              cols="100"
              rows="8"
            ></textarea>
          </div>
        </form>

        {/* form / report submit button */}

        <div className=" mx-auto text-lg font-bold bg-white mt">
          <button onClick={closeModel}>Submit Report </button>
        </div>
      </div>
    </div>
  );
};

export default ModelForm;
