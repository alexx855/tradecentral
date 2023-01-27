
import { useAccount, useBalance } from "wagmi";


function Balance() {
  const {address, isConnected} = useAccount();
  const { data, isError, isLoading, isSuccess } = useBalance({
    address: address,
    formatUnits: "ether",
    enabled: isConnected,
  });
  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
  
    <div>
     <h1>balance: {data?.formatted}</h1>
    </div>
  )
  
}
export default Balance;