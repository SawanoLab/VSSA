import React, { FunctionComponent } from "react";

interface showCourtImageProps {
  type: "home" | "away";
  width?: number;
}
export const ShowCourtImage: FunctionComponent<showCourtImageProps> = ({
  type,
  width,
}) => {
  return (
    <div>
      {type === "home" ? (
        <img
          src="/volleyball-court3.jpg"
          alt="court"
          style={{ width: width ? `${width}px` : "280px" }}
        />
      ) : (
        <img
          src="/volleyball-court4.jpg"
          alt="court"
          style={{ width: width ? `${width}px` : "280px" }}
        />
      )}
    </div>
  );
};
