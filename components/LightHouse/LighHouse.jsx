import React from "react";
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async (e) => {
    // Push file to lighthouse node
    const output = await lighthouse.upload(e, "", progressCallback);

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <div>
      <input onChange={e => deploy(e)} type="file" />
    </div>
  );
}

export default App;