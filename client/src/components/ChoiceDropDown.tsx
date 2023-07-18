type Choice = {
  label: string;
  value: string;
};

type ChoiceDropdownProps = {
  choices: Choice[];
  selectedValue: () => string;
  setSelectedValue: (value: string) => void;
  title: string;
};

export default function ChoiceDropdown(props: ChoiceDropdownProps) {
  const { choices, selectedValue, setSelectedValue, title } = props;

  return (
    <div class="relative m-4">
      <label class="block mb-1 text-white">{title}</label>

      <select
        value={selectedValue()}
        onChange={(e) => setSelectedValue(e.target.value)}
        class="block appearance-none w-full px-4 py-2 text-white bg-transparent border border-gray-300 rounded-md"
      >
        <option value="none">None</option>

        {choices.map((choice) => (
          <option value={choice.value}>{choice.label}</option>
        ))}
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg
          class="w-4 h-4"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
