import toast, { Toaster } from 'solid-toast';

import { clientConstants } from '~/utils/constants';
import { createSignal } from 'solid-js';
import { login } from '~/utils/session';
import { useNavigate } from 'solid-start';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleLogin = async (e: SubmitEvent) => {
    try {
      e.preventDefault();

      await login({ username: username(), password: password() });

      navigate(clientConstants.commandsPage);
      toast.success('Login Successful');
    } catch (err) {
      console.error(err);
    }
  };

  const goToRegisterPage = () => {
    navigate(clientConstants.registerUrl);
  };

  return (
    <div
      class={`flex flex-col items-center justify-center h-screen bg-gray-900`}
    >
      <Toaster />

      <button
        class={`absolute top-4 left-4 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        onclick={goToRegisterPage}
      >
        Setup Credentials
      </button>
      <div class={`w-full max-w-md`}>
        <form
          class={`bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4`}
          onSubmit={handleLogin}
        >
          <div class={`mb-4`}>
            <label
              class={`block text-gray-200 text-sm font-bold mb-2`}
              for="username"
            >
              Username
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div class={`mb-6`}>
            <label
              class={`block text-gray-200 text-sm font-bold mb-2`}
              for="password"
            >
              Password
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div class={`flex items-center justify-between`}>
            <button
              class={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
