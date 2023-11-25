import React from "react";

import Navgetion from "../composents/Nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div>
      <div
        className="grid grid-cols-6 grid-row-1 h-screen
      "
      >
        <div
          className="col-span-1 row-span-1 bg-white border-r border-gray-300
        "
        >
          <Navgetion />
        </div>
        <div className="col-span-5">{props.children}</div>
      </div>
    </div>
  );
}
