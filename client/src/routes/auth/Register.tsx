import { clientConstants } from '~/utils/constants';
import { createSignal } from 'solid-js';
import { register } from '~/utils/session';
import { useNavigate } from 'solid-start';

export default function Register() {
  const navigate = useNavigate();
  const [userId, setUserId] = createSignal('');
  const [password, setPassword] = createSignal({
    firstPassword: '',
    secondPassword: '',
  });

  const handleRegister = async (e: SubmitEvent) => {
    try {
      e.preventDefault();
      const isValid = validatePassword({
        firstPassword: password().firstPassword,
        secondPassword: password().secondPassword,
      });

      if (!isValid) {
        return false;
      }
      const result = await register({
        username: userId(),
        password: password().secondPassword,
      });

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const goToLoginPage = () => {
    navigate(clientConstants.loginUrl);
  };

  return (
    <div
      class={`flex flex-col items-center justify-center h-screen bg-gray-900`}
    >
      <button
        class={`absolute top-4 left-4 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        onclick={goToLoginPage}
      >
        Login
      </button>
      <div class={`w-full max-w-md`}>
        <form
          class={`bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4`}
          onSubmit={handleRegister}
        >
          <div class={`mb-4`}>
            <label
              class={`block text-gray-200 text-sm font-bold mb-2`}
              for="user-id"
            >
              User ID
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="user-id"
              type="text"
              placeholder="Enter your user ID"
              value={userId()}
              onInput={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div class={`mb-4`}>
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
              value={password().firstPassword}
              onchange={(e) =>
                setPassword({ ...password(), firstPassword: e.target.value })
              }
              required
            />
          </div>
          <div class={`mb-6`}>
            <label
              class={`block text-gray-200 text-sm font-bold mb-2`}
              for="repeat-password"
            >
              Repeat Password
            </label>
            <input
              class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="repeat-password"
              type="password"
              placeholder="Repeat your password"
              value={password().secondPassword}
              onChange={(e) =>
                setPassword({ ...password(), secondPassword: e.target.value })
              }
              required
            />
          </div>
          <div class={`flex items-center justify-between`}>
            <button
              class={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Setup Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type Args = {
  firstPassword: string;
  secondPassword: string;
};
const validatePassword = ({
  firstPassword = '',
  secondPassword = '',
}: Args) => {
  if (firstPassword === secondPassword) {
    return true;
  }

  return false;
};
