import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LinkItem {
  icon: React.ReactNode;
  to: string;
  text: string;
}

interface Category {
  category: string;
  items: LinkItem[];
}

interface ItemsProps {
  links: Category[];
}

export default function Items({ links }: ItemsProps) {
  const location = useLocation();

  return (
    <nav className="flex flex-col" role="navigation">
      <img src="./logo192.png" alt="Logo" className="h-20 w-20 mx-auto m-2" />
      {links.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h3>{category.category}</h3>
          {category.items.map((link, linkIndex) => (
            <div
              key={linkIndex}
              className={`text-sm w-full text-left p-2 mb-0.5 text-blue-950 ${
                link.to === location.pathname ? "bg-slate-50" : "bg-transparent"
              }`}
            >
              <Link to={link.to}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="ml-5">{link.icon}</span>
                  <span className="ml-2">{link.text}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
