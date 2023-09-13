import React from "react";

const Header = () => {
  return (
    <div className="HeaderContainer">
      <div className="mainContentForHeader">
        <div className="textContainer">
          <b className="font-set">Game of NFTs </b>
          <span className="font-set"> is now </span>
          <b className="font-set"> Live! </b>

          <button className="btn btn-secondary mx-2 btn-sm">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
