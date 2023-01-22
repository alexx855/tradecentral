import React from "react";
import {
  erc721ABI,
  goerli,
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractRead,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";
import TokenURI from "./TokenURI.jsx";
import { useEffect } from "react";
import { useMemo } from "react";
import contractAdress from "./ContractAdress";
const tradeData = {};
const mlootContractConfig = {
  address: contractAdress,
  chainId: 5,
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
              "internalType": "bool",
              "name": "isSold",
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
            args: [BigNumber.from(index)],
          },
        ];
      },
      { start: 1, perPage: 100, direction: "increment" }
    ),
  });

   


  
  //get items from data and return in a new array
  const result = data?.pages?.map((page) => {
    return page?.map((item) => {
      if (!isLoading || item?.id != 0 || item?.id != null) {
        tradeData = {
          id: item[0]?.toNumber(),
          buyer: item[1],
          seller: item[2],
          price: item[3],
          name: item[4],
          desc: item[5],
          image: item[6],
          sold: item[7],
        };
      }
      return itemData;
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