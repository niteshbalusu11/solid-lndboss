import { createSignal } from 'solid-js';

const stringify = (n: any) => JSON.stringify(n, null, 2);
type ErrorPopupProps = {
  errorMessage: string;
};

export default function ErrorPopup(props: ErrorPopupProps) {
  const [isOpen, setIsOpen] = createSignal(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const prettyPrintJson = (jsonString: string) => {
    return stringify(jsonString);
  };

  return (
    <div
      classList={{ fixed: isOpen(), hidden: !isOpen() }}
      class="inset-0 flex items-center justify-center z-10"
    >
      <div class="bg-white rounded-lg p-8 shadow-lg max-w-md overflow-hidden">
        <h2 class="text-xl font-bold mb-4">Error</h2>
        <pre class="overflow-y-auto max-h-80 whitespace-pre-wrap text-sm">
          {prettyPrintJson(props.errorMessage)}
        </pre>
        <button
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
