import React from "react";

import Navgetion from "../composents/Nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const hover = () => {
    console.log(isMenuOpen);
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

  const leave = () => {
    console.log(isMenuOpen);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      <div
        className={`grid
      ${isMenuOpen ? "grid-cols-6" : "grid-cols-12"}
      grid-row-1 h-screen`}
      >
        <div
          className={`
          ${
            isMenuOpen ? null : ""
          } col-span-1 row-span-1 bg-white border-r border-gray-300`}
          onMouseOver={hover}
          onMouseLeave={leave}
        >
          <Navgetion isMenuOpen={isMenuOpen} />
        </div>
        <div className={isMenuOpen ? "col-span-5" : "col-span-11"}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
