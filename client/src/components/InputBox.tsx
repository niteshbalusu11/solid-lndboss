type InputProps = {
  label: string;
  value: () => string;
  setValue: (value: string) => void;
  placeholder?: string;
};

export default function InputBox(props: InputProps) {
  const { label, value, setValue, placeholder } = props;

  return (
    <div class="m-4">
      <label class="text-white">{label}</label>
      <input
        type="text"
        value={value()}
        onInput={(e) => setValue(e.target.value)}
        class="px-4 py-2 text-white bg-transparent border border-gray-300 rounded-md w-full"
        placeholder={placeholder}
      />
    </div>
  );
}
