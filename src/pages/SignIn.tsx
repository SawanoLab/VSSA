import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('fuu05160@gmail.com');
  const [password, setPassword] = useState('hoge1234');

  const executeSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await auth.signIn(username, password);
    if (result.success) {
      navigate({ pathname: '/dashboard' });
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <form noValidate onSubmit={executeSignIn} className="bg-white p-8 rounded">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm">メールアドレス: </label>
          <input
            id="username"
            type="email"
            // value={username}
            defaultValue={
              'fuu05160@gmail.com'
            }
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm">パスワード: </label>
          <input
            id="password"
            type="password"
            defaultValue={'hoge1234'}
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">ログイン</button>
      </form>
    </div>
  );
}
