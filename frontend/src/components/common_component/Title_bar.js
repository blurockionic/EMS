import React from "react";

const Title_bar = () => {
  return (
    <div>
      <div className="flex flex-row justify-evenly text-white text-lg pt-1 h-[2.5rem] rounded-lg bg-slate-900 mt-8  mx-auto w-[95%]">
        <div>Profile picture </div>
        <div>Name</div>
        <div>Designation</div>
      </div>
    </div>
  );
};

export default Title_bar;
