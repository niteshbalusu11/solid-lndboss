// Card.jsx

import { A } from 'solid-start';

type Args = {
  title: string;
  description: string;
  link: string;
};
const CommandsCard = ({ title, description, link }: Args) => {
  return (
    <div class="border border-gray-800 bg-gray-800 text-white p-4 rounded-lg cursor-pointer transition-all transform hover:scale-105">
      <A href={link}>
        <div>
          <h2 class="text-xl font-bold mb-2">{title}</h2>
          <p class="text-gray-300">{description}</p>
        </div>
      </A>
    </div>
  );
};

export default CommandsCard;
