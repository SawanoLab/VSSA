import { useAuth } from "hooks/use-auth";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const HomeIndex: React.FC<Props> = () => {
  return <Component />;
};

const loginComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <button onClick={() => auth.signOut()}>ログアウト</button>
      <h1>こんにちは！</h1>
      <p>まずシーズン→チーム→選手→試合の順番で情報を登録しよう！</p>
    </div>
  );
};

const notLoginComponent = () => {
  return (
    <div className="flex m-2">
      <Link to="/signin" 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        ログイン
      </Link>
    </div>
  );
};

interface IProps {}

export const Component: React.FC<IProps> = () => {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuthenticated.valueOf() ? loginComponent() : notLoginComponent()}
    </div>
  );
};

export default HomeIndex;
