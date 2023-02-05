import {
	paginatedIndexesConfig,
	useContractInfiniteReads,
} from "wagmi";
import { BigNumber, ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

let tradeData = {};
const mlootContractConfig = {
	address: CONTRACT_ADDRESS,
	abi: [
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_itemId",
					"type": "uint256"
				}
			],
			"name": "lookTrades",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "id",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "buyer",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "price",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "description",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "image",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "country",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "category",
							"type": "string"
						},
						{
							"internalType": "bool",
							"name": "isSold",
							"type": "bool"
						},
						{
							"internalType": "bool",
							"name": "staking",
							"type": "bool"
						}
					],
					"internalType": "struct TradeCentral.Trade",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
	],
};
export function GetAllItems() {

	const { data, fetchNextPage, isLoading } = useContractInfiniteReads({
		cacheKey: "mlootAttributes",
		...paginatedIndexesConfig(
			(index) => {
				return [
					{
						...mlootContractConfig,

						functionName: "lookTrades",
						abi: mlootContractConfig.abi,
						args: [index],
					},
				];
			},
			{ start: 0, perPage: 100, direction: "increment" }
		),
	});

	const result = data?.pages?.map((page) => {
		return page?.map((item) => {
			if (!isLoading || item[0] != 0) {
				tradeData = {
					id: item[0]?.toNumber(),
					buyer: item[1],
					seller: item[2],
					price: item[3],
					name: item[4],
					desc: item[5],
					image: item[6],
					country: item[7],
					category: item[8],
					isSold: item[9],
					staking: item[10],
				};
			}
			return tradeData;
		});
	});
	const items = result?.map((item) => {
		return item?.filter((item) => item.id !== 0);
	});

	const trades = items?.find((item) => item);


	return {
		items,
		data,
		fetchNextPage,
		isLoading,
		trades,
	};
}