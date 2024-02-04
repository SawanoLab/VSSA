import React from "react";

import { YoutubeVideoSplitCard } from "./YoutubeVideoSplitCard";

interface YoutubeVideoSplitCardsType {
  setYoutubeTime: (time: number) => void;
}
export const YoutubeVideoSplitCards: React.FC<YoutubeVideoSplitCardsType> = ({
  setYoutubeTime,
}) => {
  const [clickedButton, setClickedButton] = React.useState<number>(0);
  return (
    <ul
      className="col-span-2 md:col-span-3 lg:col-span-4 flex justify-left overflow-x-auto"
      style={{ width: "600px" }}
    >
      <YoutubeVideoSplitCard
        img_path={"/00-00-serve.png"}
        isClicked={clickedButton === 0}
        clickHandler={() => {
          setYoutubeTime(10);
          setClickedButton(0);
        }}
        type="サーブ"
      />
      <YoutubeVideoSplitCard
        img_path={"/01-00-serve.png"}
        isClicked={clickedButton === 1}
        clickHandler={() => {
          setYoutubeTime(20);
          setClickedButton(1);
        }}
        type="サーブ"
      />
      <YoutubeVideoSplitCard
        img_path={"/01-00-spike.png"}
        isClicked={clickedButton === 2}
        clickHandler={() => {
          setYoutubeTime(32);
          setClickedButton(2);
        }}
        type="スパイク"
      />
      <YoutubeVideoSplitCard
        img_path={"/01-01-serve.png"}
        isClicked={clickedButton === 3}
        clickHandler={() => {
          setYoutubeTime(50);
          setClickedButton(3);
        }}
        type="サーブ"
      />
      <YoutubeVideoSplitCard
        img_path={"/01-01-spike.png"}
        isClicked={clickedButton === 4}
        clickHandler={() => {
          setYoutubeTime(53);
          setClickedButton(4);
        }}
        type="スパイク"
      />
      <YoutubeVideoSplitCard
        img_path={"/02-01-serve.png"}
        isClicked={clickedButton === 5}
        clickHandler={() => {
          setYoutubeTime(70);
          setClickedButton(5);
        }}
        type="サーブ"
      />
      <YoutubeVideoSplitCard
        img_path={"/02-01-spike.png"}
        isClicked={clickedButton === 6}
        clickHandler={() => {
          setYoutubeTime(76);
          setClickedButton(6);
        }}
        type="スパイク"
      />
      <YoutubeVideoSplitCard
        img_path={"/03-01-serve.png"}
        isClicked={clickedButton === 7}
        clickHandler={() => {
          setYoutubeTime(86);
          setClickedButton(7);
        }}
        type="サーブ"
      />
      <YoutubeVideoSplitCard
        img_path={"/03-01-spike.png"}
        isClicked={clickedButton === 8}
        clickHandler={() => {
          setYoutubeTime(90);
          setClickedButton(8);
        }}
        type="スパイク"
      />
    </ul>
  );
};
