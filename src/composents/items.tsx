import React from "react";
import { Link } from "react-router-dom";

interface LinkItem {
  icon: React.ReactNode;
  to: string;
  text: string;
}

interface Category {
  items: LinkItem[];
}

interface ItemsProps {
  links: Category[];
  isOpen: boolean;
}

export default function Items({ links, isOpen }: ItemsProps) {
  return (
    <nav className="flex flex-col w-full" role="navigation">
      {links.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          {category.items.map((link, linkIndex) => (
            <div
              key={linkIndex}
              className="border-y border-gray-300  hover:bg-slate-50"
            >
              <Link
                to={link.to}
                className="flex items-center p-3 text-blue-950 hover:text-black"
              >
                <span className="ml-7">{link.icon}</span>
                <span className={`ml-2 ${isOpen ? "block" : "hidden"}`}>
                  {link.text}
                </span>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
