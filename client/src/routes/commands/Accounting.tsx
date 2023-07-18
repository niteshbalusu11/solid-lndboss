import { Head, Title } from 'solid-start';
import { Show, createSignal } from 'solid-js';
import commands, { globalCommands } from '~/utils/commands';
import toast, { Toaster } from 'solid-toast';

import AccountingOutput from '~/outputs/AccountingOutput';
import ChoiceDropdown from '~/components/ChoiceDropDown';
import CommandHeadings from '~/components/CommandHeadings';
import ErrorPopup from '~/components/ErrorPopup';
import FlexBox from '~/components/FlexBox';
import HomeButton from '~/components/HomeButton';
import InputBox from '~/components/InputBox';
import SubmitButton from '~/components/SubmitButton';
import SwitchButton from '~/components/SwitchButton';
import { axiosGet } from '~/utils/axios';
import { commandAccounting } from '~/utils/types';

/*
  Renders the Accounting page
  Passes query parameters to the accounting results page
*/

const AccountingCommand = commands.find((n) => n.value === 'Accounting');
const choiceArray = Object.entries(AccountingCommand?.args!).map(
  ([key, value]) => ({
    value,
    label: key,
  }),
);

type ResultType = { rows: string[][]; rows_summary: string[][] };

const Accounting = () => {
  const [errorMessage, setErrorMessage] = createSignal('');
  const [category, setCategory] = createSignal('none');
  const [date, setDate] = createSignal('');
  const [isCsv, setIsCsv] = createSignal(false);
  const [isFiatDisabled, setIsFiatDisabled] = createSignal(true);
  const [month, setMonth] = createSignal('');
  const [node, setNode] = createSignal('');
  const [rateProvider, setRateProvider] = createSignal('');
  const [year, setYear] = createSignal('');
  const [data, setData] = createSignal<ResultType | undefined>(undefined, {
    equals: false,
  });

  const fetchData = async (event: SubmitEvent) => {
    toast.loading('Loading...');
    setErrorMessage('');
    setData(undefined);
    event.preventDefault();

    const query: commandAccounting = {
      category: category(),
      date: date(),
      month: month(),
      node: node(),
      year: year(),
      is_csv: isCsv(),
      is_fiat_disabled: isFiatDisabled(),
      rate_provider: rateProvider(),
    };

    const { result, error } = await axiosGet({ path: 'accounting', query });

    // Handle the response data
    if (!!result) {
      console.log(result);
      setData(result as ResultType);
    }

    toast.dismiss();

    if (!!error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <Toaster />
      <Head>
        <Title>Accounting</Title>
      </Head>
      <HomeButton />

      <FlexBox>
        <CommandHeadings
          name={AccountingCommand?.name!}
          longDescription={AccountingCommand?.longDescription!}
        />
        <form onSubmit={fetchData}>
          <ChoiceDropdown
            title="Authentication Type"
            choices={choiceArray}
            selectedValue={category}
            setSelectedValue={setCategory}
          />
          <SwitchButton
            label={AccountingCommand?.flags?.is_csv!}
            onChange={setIsCsv}
            value={isCsv()}
          />
          <SwitchButton
            label={AccountingCommand?.flags?.is_fiat_disabled!}
            onChange={setIsFiatDisabled}
            value={isFiatDisabled()}
          />
          <InputBox
            label={AccountingCommand?.flags?.month!}
            value={month}
            setValue={setMonth}
            placeholder={`${AccountingCommand?.flags?.month} (Records for specified month)`}
          />
          <InputBox
            label={AccountingCommand?.flags?.date!}
            value={date}
            setValue={setDate}
            placeholder={`${AccountingCommand?.flags
              ?.date!} (Records for specified date of month)`}
          />
          <InputBox
            label={AccountingCommand?.flags?.rate_provider!}
            value={rateProvider}
            setValue={setRateProvider}
            placeholder={`${AccountingCommand?.flags
              ?.rate_provider!} (default Coindesk)`}
          />
          <InputBox
            label={AccountingCommand?.flags?.year!}
            value={year}
            setValue={setYear}
            placeholder={`${AccountingCommand?.flags
              ?.year!} (Records for specified year)`}
          />
          <InputBox
            label={globalCommands.node.name}
            value={node}
            setValue={setNode}
            placeholder={globalCommands.node.name}
          />

          <SubmitButton>Run Command</SubmitButton>
        </form>

        <Show when={errorMessage() !== ''}>
          <ErrorPopup errorMessage={errorMessage()} />
        </Show>

        <Show when={!!data() && !!data()?.rows && !!data()?.rows_summary}>
          <AccountingOutput
            data1={data()?.rows || [[]]}
            data2={data()?.rows_summary || [[]]}
          />
        </Show>
      </FlexBox>
    </>
  );
};

export default Accounting;
