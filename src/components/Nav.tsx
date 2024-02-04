
import React from "react";
import { FaVolleyballBall } from "react-icons/fa";
import { FaPersonBooth } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
// import { FaChessKing } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";

import Items from "./items";

interface NavgetionProps {
  isMenuOpen: boolean;
}

export default function Navgetion(
  { isMenuOpen }: NavgetionProps
) {
  const links = [
    {
      items: [
        { icon: <FaVolleyballBall />, to: "/match", text: "試合" },
        { icon: <FaPersonBooth />, to: "/player", text: "選手" },
        { icon: <FaCalendar />, to: "/team", text: "チーム" },
      ],
    },
    {
      items: [
        { icon: <HiDocumentReport />, to: "analysis/reports/match", text: "スパイクコース" },
      ]
    }
  ];

  return <Items
  links={links}
  isOpen={isMenuOpen}
  />;
}
