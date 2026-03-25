import { Toaster } from 'react-hot-toast';

const HotToaster = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: 'rgb(248 250 252)',
        color: '#1e293b',
        border: '1px solid rgb(226 232 240)',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
      },
    }}
  />
);

export default HotToaster;

