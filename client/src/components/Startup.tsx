import { clientConstants } from '~/utils/constants';
import { useNavigate } from 'solid-start';

const Startup = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate(clientConstants.loginUrl);
  }, 3000);

  return (
    <div class={`flex items-center justify-center min-h-screen bg-black`}>
      <video
        class={`absolute top-0 left-0 w-full h-full object-cover`}
        autoplay
        muted
      >
        <source src="/startup.mp4" type="video/mp4" id="startup_video" />
      </video>
    </div>
  );
};

export default Startup;
