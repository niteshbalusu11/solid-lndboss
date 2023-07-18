import { JSXElement } from 'solid-js';

type ButtonProps = {
  children: string;
};

export default function SubmitButton(props: ButtonProps): JSXElement {
  return (
    <button
      class="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
      type="submit"
    >
      {props.children}
    </button>
  );
}
