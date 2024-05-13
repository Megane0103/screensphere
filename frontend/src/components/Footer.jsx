import React from "react";

function YearCopyright() {
  return  <p id="copyright-year">All Rights Reserved @ {new Date().getFullYear()} Mouad Lotfi</p>;
}

const Footer = () => {
  return (
    <div className=" itmes-center justify-center text-gray-400 my-6 hidden md:flex">
      <YearCopyright/>
    </div>
  );
};

export default Footer;
