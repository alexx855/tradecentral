 import React from "react";
// import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";
// import { useState } from "react";
// import { BigNumber } from "ethers";

// const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
// const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

// export const ChangeProfile = (props: UserProps) => {

//   const [email, setEmail] = useState("");
//   const [tokenURI, setTokenURI] = useState("");
//   const [name, setName] = useState("");

//   const { config } = usePrepareContractWrite({
//     address: CONTRACT_ADDRESS,
//     chainId: +CHAIN_ID!,
//     overrides: {
//       from: props.address,
//       gasLimit: BigNumber.from(1000000),
//     },
//     abi: [
//     	{
// 				"inputs": [
// 					{
// 						"internalType": "string",
// 						"name": "_email",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "_name",
// 						"type": "string"
// 					},
// 					// {
// 					// 	"internalType": "string",
// 					// 	"name": "_image",
// 					// 	"type": "string"
// 					// }
// 				],
// 				"name": "updateProfile",
// 				"outputs": [],
// 				"stateMutability": "nonpayable",
// 				"type": "function"
// 			},
//     ],
//     args: [email, name],
//     functionName: "updateProfile",
//   });
//   const { write } = useContractWrite(config);

//   return (
//     <>

//       <div className=" flex flex-col items-center justify-center" >
//         <div className="">

//           <input className=""
//             defaultValue={props.email}
//             placeholder="email"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input className=""
//             defaultValue={props.name}
//             placeholder="name"
//             onChange={(e) => setName(e.target.value)}
//           />
//           {/* TODO: implement images storage with lighthouse SKD */}
//           {/* <input className=""
//             placeholder="profile image"
//             onChange={(e) => setTokenURI(e.target.value)}
//           /> */}
//           <br />
//           {/* address form */}

//           <button
//             onClick={() => write?.()}
//           >
//             Update profile info
//           </button>
//         </div>
//       </div>

//     </>
//   );
// };

// export default ChangeProfile;