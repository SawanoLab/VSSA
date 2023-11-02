import { FaVolleyballBall } from 'react-icons/fa';
import { FaPersonBooth } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import Items from '../composents/items';

export default function Navgetion() {

  const links = [
    {
      category: "データベース",
      items: [
        { icon: <FaVolleyballBall />, to: "/about", text: "試合" },
        { icon: <FaPersonBooth />, to: "/contact", text: "プレイヤー" },
        { icon: <FaCalendar />, to: "/team", text: "チーム" },
        { icon: <FaCalendar />, to: "/season", text: "シーズン" },
      ],
    },
  ];
  

  return (
    <Items links={links} />
  );
}
