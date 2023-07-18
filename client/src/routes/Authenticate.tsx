import { Head, useNavigate } from 'solid-start';
import { Show, createSignal } from 'solid-js';
import { clientConstants, serverUrl } from '~/utils/constants';
import toast, { Toaster } from 'solid-toast';

import ChoiceDropdown from '~/components/ChoiceDropDown';
import DropdownButton from '~/components/DropdownButton';
import ErrorPopup from '~/components/ErrorPopup';
import FlexBox from '~/components/FlexBox';
import InputBox from '~/components/InputBox';
import SubmitButton from '~/components/SubmitButton';
import SwitchButton from '~/components/SwitchButton';
import axios from 'axios';
import { getAuthenticatedCookie } from '~/utils/session';

const authTypes = [
  {
    label: 'Path To Lnd Files',
    value: 'path',
  },
  {
    label: 'Credentials',
    value: 'credentials',
  },
];

type PostBody = {
  cert: string;
  macaroon: string;
  socket: string;
  auth_type: string;
  is_default: boolean;
  cert_path: string;
  macaroon_path: string;
  node: string;
};

export default function Authenticate() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = createSignal('');
  const [authType, setAuthType] = createSignal('none');
  const [certPath, setCertPath] = createSignal('');
  const [macaroonPath, setMacaroonPath] = createSignal('');
  const [socket, setSocket] = createSignal('');

  const [cert, setCert] = createSignal('');
  const [macaroon, setMacaroon] = createSignal('');
  const [defaultNode, setDefaultNode] = createSignal(true);
  const [nodeName, setNodeName] = createSignal('');

  const handleAuthenticate = async (event: SubmitEvent) => {
    setErrorMessage('');
    event.preventDefault();

    const postBody: PostBody = {
      cert: cert(),
      macaroon: macaroon(),
      socket: socket(),
      auth_type: authType(),
      is_default: defaultNode(),
      cert_path: certPath(),
      macaroon_path: macaroonPath(),
      node: nodeName(),
    };

    try {
      const accessToken = getAuthenticatedCookie();

      const url = `${serverUrl}api/credentials`;

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const response = await axios.post(url, postBody, config);

      const { connection, error, result } = await response.data;

      if (!!error) {
        toast.error('Failed to Connect to Lnd');
        return;
      }

      if (!result || !!connection.error) {
        toast.error('Failed to Connect to Lnd');
        setErrorMessage(connection.error);
        return;
      }

      if (!!result && !!connection.hasAccess) {
        setErrorMessage('');
        navigate(clientConstants.commandsPage);
        toast.success('Credentials saved and Authenticated to LND! 🚀');
      }
    } catch (err: any) {
      toast.error('Failed to Connect to Lndddd');
      setErrorMessage(err.response.data);
    }
  };

  return (
    <FlexBox>
      <Head>
        <title>Authenticate</title>
      </Head>
      <Toaster />
      <DropdownButton />
      <form onsubmit={handleAuthenticate}>
        <ChoiceDropdown
          title="Authentication Type"
          choices={authTypes}
          selectedValue={authType}
          setSelectedValue={setAuthType}
        />

        <Show when={authType() === authTypes[0].value}>
          <InputBox
            label="Tls Cert Path"
            setValue={setCertPath}
            value={certPath}
          />
          <InputBox
            label="Macaroon Path"
            setValue={setMacaroonPath}
            value={macaroonPath}
          />
          <InputBox label="Socket" setValue={setSocket} value={socket} />
          <InputBox label="Node Name" setValue={setNodeName} value={nodeName} />
          <SwitchButton
            onChange={setDefaultNode}
            value={defaultNode()}
            label="Is Default Node?"
          />
        </Show>

        <Show when={authType() === authTypes[1].value}>
          <InputBox label="Tls Cert Base64" setValue={setCert} value={cert} />
          <InputBox
            label="Macaroon Base64"
            setValue={setMacaroon}
            value={macaroon}
          />
          <InputBox label="Socket" setValue={setSocket} value={socket} />
          <InputBox label="Node Name" setValue={setNodeName} value={nodeName} />

          <SwitchButton
            onChange={setDefaultNode}
            value={defaultNode()}
            label="Is Default Node?"
          />
        </Show>

        <SubmitButton>Authenticate</SubmitButton>
      </form>
      <Show when={errorMessage() !== ''}>
        <ErrorPopup errorMessage={errorMessage()} />
      </Show>
    </FlexBox>
  );
}
