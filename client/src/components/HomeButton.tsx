import { A } from 'solid-start';
import { clientConstants } from '~/utils/constants';
import { createSignal } from 'solid-js';

const HomeButton = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen());
  };

  return (
    <div class="fixed top-4 left-4 z-50">
      <button
        class="text-white bg-gray-800 hover:bg-gray-600 px-6 py-3 rounded-lg"
        onClick={handleDropdownToggle}
      >
        Home
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
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeButton;
