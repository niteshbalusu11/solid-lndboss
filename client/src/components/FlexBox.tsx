import { JSXElement } from 'solid-js';

export default function FlexBox({ children }: { children: JSXElement }) {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div class="max-w-4xl w-full px-8 py-12 bg-gray-800 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}
