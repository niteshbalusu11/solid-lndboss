export type BalanceOutputProps = {
  data: { [key: string]: number };
};

export default function BalanceOutput({ data }: BalanceOutputProps) {
  return (
    <div class="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
      <table class="table-fixed w-full text-white">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr>
              <td class="w-1/2">{key}</td>
              <td class="w-1/2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
