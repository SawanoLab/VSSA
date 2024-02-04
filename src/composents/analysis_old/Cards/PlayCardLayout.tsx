import React, { FunctionComponent } from 'react';

interface PlayCardLayoutProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  type: "home" | "away";
}
 
const PlayCardLayout: FunctionComponent<PlayCardLayoutProps> = ({
  children,
  title,
  subTitle,
  type,
}) => {
  return (
    <div
      className="border border-gray-400"
      style={{ width: "300px", height: "550px" }}
    >
      <div
        className={`bg-${type=='home' ? "blue" : "red"}-400`}
        style={{ width: "300px", height: "80px" }}
      >
        <p
          className="text-white p-2"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >{title}</p>
        <span
          className="text-white pl-2"
        >{subTitle}</span>
      </div>
      <div
        className='m-2'
      >
      {children}  
      </div>
    </div>
  );
}
 
export default PlayCardLayout;
