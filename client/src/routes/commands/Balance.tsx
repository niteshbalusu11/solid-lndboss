import { Head, Title } from 'solid-start';
import { Show, createSignal } from 'solid-js';
import commands, { globalCommands } from '~/utils/commands';
import toast, { Toaster } from 'solid-toast';

import BalanceOutput from '~/outputs/BalanceOutput';
import CommandHeadings from '~/components/CommandHeadings';
import ErrorPopup from '~/components/ErrorPopup';
import FlexBox from '~/components/FlexBox';
import HomeButton from '~/components/HomeButton';
import InputBox from '~/components/InputBox';
import SubmitButton from '~/components/SubmitButton';
import SwitchButton from '~/components/SwitchButton';
import { axiosGet } from '~/utils/axios';
import { commandBalance } from '~/utils/types';

/*
  Renders the bos balance command
  GET call to the NestJs process to balance information
*/

const BalanceCommand = commands.find((n) => n.value === 'Balance');
type BalanceOutput = { [key: string]: number };

export default function Balance() {
  const [errorMessage, setErrorMessage] = createSignal('');
  const [above, setAbove] = createSignal('');
  const [below, setBelow] = createSignal('');
  const [confirmed, setConfirmed] = createSignal(false);
  const [detailed, setDetailed] = createSignal(false);
  const [offchain, setOffchain] = createSignal(false);
  const [onchain, setOnchain] = createSignal(false);
  const [data, setData] = createSignal<undefined | BalanceOutput>(undefined, {
    equals: false,
  });
  const [node, setNode] = createSignal('');

  const fetchData = async (event: SubmitEvent) => {
    toast.loading('Loading...');
    setErrorMessage('');
    setData(undefined);
    event.preventDefault();

    const query: commandBalance = {
      above: Number(above()),
      below: Number(below()),
      is_confirmed: confirmed(),
      is_detailed: detailed(),
      is_offchain_only: offchain(),
      is_onchain_only: onchain(),
      node: node(),
    };

    const { result, error } = await axiosGet({ path: 'balance', query });

    if (!!result) {
      setData(result);
    }

    toast.dismiss();

    if (!!error) {
      setErrorMessage(error);
    }
  };

  return (
    <FlexBox>
      <Toaster />
      <Head>
        <Title>Balance</Title>
      </Head>
      <HomeButton />
      <CommandHeadings
        name={BalanceCommand?.name!}
        description={BalanceCommand?.description!}
      />
      <form onSubmit={fetchData}>
        <InputBox
          label={BalanceCommand?.flags?.above!}
          value={above}
          setValue={setAbove}
          placeholder="Above (Number)"
        />
        <InputBox
          label={BalanceCommand?.flags?.below!}
          value={below}
          setValue={setBelow}
          placeholder="Above (Number)"
        />
        <SwitchButton
          label={BalanceCommand?.flags?.confirmed!}
          onChange={setConfirmed}
          value={confirmed()}
        />
        <SwitchButton
          label={BalanceCommand?.flags?.detailed!}
          onChange={setDetailed}
          value={detailed()}
        />
        <SwitchButton
          label={BalanceCommand?.flags?.offchain!}
          onChange={setOffchain}
          value={offchain()}
        />
        <SwitchButton
          label={BalanceCommand?.flags?.onchain!}
          onChange={setOnchain}
          value={onchain()}
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
      <Show when={data() !== undefined}>
        <BalanceOutput data={data() || {}} />
      </Show>
    </FlexBox>
  );
}
