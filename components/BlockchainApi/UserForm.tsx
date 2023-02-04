import React from "react";
// import { useAccount, useContractRead } from 'wagmi';
// import CreateUser from './createUser';
// import UpdateUser from './changeProfile';
// const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
// const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

// // return a user form, to create a user or update a user
// const UserForm = () => {
//   const {address} = useAccount();
//   const { data: hasProfile, isError, isLoading } = useContractRead({
//     address: CONTRACT_ADDRESS,
//     chainId: +CHAIN_ID!,
//     abi: [
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "_userAddress",
//             "type": "address"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function",
//         "name": "userExists",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ]
//       }
//     ],
//     functionName: 'userExists',
//     args: [address],
//     onError(err) {
//       console.log(err)
//     },
//     onSuccess(data) {
//       console.log(data)
//     }
//   })

//   if (isLoading)
//     return (<div>Loading Form...</div>)

//   if (isError)
//     return (<div>Error</div>)

//   return (
//     <section id={`user-form-${props.address}`} >
//       {!hasProfile ? <CreateUser {...props} /> : <UpdateUser {...props} />}
//     </section >
//   );
// };

// export default UserForm;