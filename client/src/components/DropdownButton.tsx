import { A, useNavigate } from 'solid-start';
import toast, { Toaster } from 'solid-toast';

import { clientConstants } from '~/utils/constants';
import { createSignal } from 'solid-js';
import { removeAuthenticatedCookie } from '~/utils/session';

const DropdownButton = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = createSignal(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen());
  };

  const handleLogoutClick = () => {
    toast.success('Logout Successful');
    removeAuthenticatedCookie();
    navigate(clientConstants.loginUrl);
  };

  return (
    <div class="fixed top-4 left-4 z-50">
      <Toaster />

      <button
        class="text-white bg-gray-800 hover:bg-gray-600 px-6 py-3 rounded-lg"
        onClick={handleDropdownToggle}
      >
        Options
      </button>
      {isOpen() && (
        <div class="absolute left-0 mt-1 bg-gray-800 p-2 rounded-md">
          <ul class="text-white">
            <li>
              <A
                href={clientConstants.commandsPage}
                class="block px-2 py-1 hover:bg-gray-700 rounded-md"
              >
                Commands
              </A>
            </li>
            <li>
              <A
                href={clientConstants.dashboardPage}
                class="block px-2 py-1 hover:bg-gray-700 rounded-md"
              >
                Dashboard
              </A>
            </li>
            <li>
              <A
                href={clientConstants.authenticatePage}
                class="block px-2 py-1 hover:bg-gray-700 rounded-md"
              >
                Authenticate to LND
              </A>
            </li>
            <li>
              <button
                onclick={handleLogoutClick}
                class="block px-2 py-1 hover:bg-gray-700 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
