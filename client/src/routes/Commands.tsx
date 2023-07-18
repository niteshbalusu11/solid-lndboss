import CommandsCard from '~/components/CommandsCard';
import DropdownButton from '~/components/DropdownButton';
import { For } from 'solid-js';
import commands from '~/utils/commands';

const Page = () => {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <DropdownButton />
      <div class="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <For each={commands} fallback={<div>Loading...</div>}>
          {(command) => (
            <div class="p-2">
              <CommandsCard
                title={command.name}
                description={command.description}
                link={command.value}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Page;
