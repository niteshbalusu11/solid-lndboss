import { createEffect, onCleanup } from 'solid-js';

type TableProps = {
  data1: string[][];
  data2: string[][];
};

const AccountingOutput = (props: TableProps) => {
  createEffect(() => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');

    const renderOutput = () => {
      const output = `
        <html>
          <head>
            <title>Table View</title>
            <style>
              body {
                margin: 16px;
                background-color: #111827;
                color: #f9fafb;
                font-family: Arial, sans-serif;
              }
              table {
                width: 100%;
                background-color: #1f2937;
                border-collapse: collapse;
                border: 1px solid #374151;
                margin-bottom: 16px;
              }
              th, td {
                padding: 8px;
                border-bottom: 1px solid #374151;
                text-align: left;
                color: #f9fafb;
              }
              th {
                background-color: #4b5563;
                font-weight: bold;
              }
              tr:nth-child(even) {
                background-color: #374151;
              }
            </style>
          </head>
          <body>
            ${renderTable(props.data2)}
            ${renderTable(props.data1)}
          </body>
        </html>
      `;
      newWindow?.document.open();
      newWindow?.document.write(output);
      newWindow?.document.close();
    };

    const renderTable = (data: string[][]) => `
      <table>
        <thead>
          <tr>
            ${data[0].map((column) => `<th>${column}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data
            .slice(1)
            .map(
              (row, index) => `
                <tr${
                  index % 2 === 0 ? ' style="background-color: #475569;"' : ''
                }>
                  ${row.map((cell) => `<td>${cell}</td>`).join('')}
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    `;

    renderOutput();

    // Cleanup: close the new window
    onCleanup(() => {
      newWindow?.close();
    });
  });

  return null;
};

export default AccountingOutput;
