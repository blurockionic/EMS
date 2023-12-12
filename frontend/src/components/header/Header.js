import React from "react";

const Header = () => {
  return (
    <div>
      <div className="w-full h-[2.5rem] overflow-y-hidden">
        <div className=" flex  justify-end ">
          {
            <button
              className="mr-10 text-white"
              onClick={() => {
                //   setloggedIn(false);
              }}
            >
              Logout
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
