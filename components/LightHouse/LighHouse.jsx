import React from "react";
import lighthouse from '@lighthouse-web3/sdk';
const API_KEY = process.env.NEXT_PUBLIC__LIGHTHOUSE_API

function Lighthouse() {

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async (e) => {
    // Push file to lighthouse node
    const output = await lighthouse.upload(e, API_KEY, progressCallback);

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <div>
      <input onChange={e => deploy(e)} type="file" />
    </div>
  );
}

export default Lighthouse;