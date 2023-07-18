import { JSX } from 'solid-js';

type SwitchButtonProps = {
  value: boolean;
  onChange: (newValue: boolean) => void;
  label: string;
};

function SwitchButton(props: SwitchButtonProps): JSX.Element {
  const handleChange = () => {
    const newValue = !props.value;
    props.onChange(newValue);
  };

  return (
    <label class="flex items-center m-6">
      <span class="relative inline-flex items-center justify-center w-14 h-8 bg-gray-300 rounded-full transition-colors duration-300">
        <input
          type="checkbox"
          checked={props.value}
          onChange={handleChange}
          class="hidden"
        />
        <span
          class={`${
            props.value ? 'bg-green-500' : 'bg-white'
          } absolute left-1 top-1 w-6 h-6 rounded-full shadow transition-all duration-300 ${
            props.value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
      <span class="ml-2 text-white">{props.label}</span>
    </label>
  );
}

export default SwitchButton;
