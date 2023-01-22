import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectButtonProps } from '@rainbow-me/rainbowkit/dist/components/ConnectButton/ConnectButton';

const Account = () => {
  const props: ConnectButtonProps = {
    accountStatus: 'avatar',
    chainStatus: 'icon',
    label: 'Account',
    showBalance: false
  }

  return (
    <>
      <ConnectButton {...props} />
    </>
  );
};

export default Account;