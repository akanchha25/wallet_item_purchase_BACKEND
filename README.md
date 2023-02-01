# wallet_item_purchase_BACKEND


Design and implemented a backend service for wallet and purchase system with the
following features
1. Setup wallet
2. Get Wallet Details
3. Add credit to the wallet
4. Product Listing
5. Make a purchase
6. List transactions history

A------> Setup wallet

URL /wallet
Method POST
Body { balance: number, name: string }
Response {

walletId: number / string,
balance: number,
transactionId: number / string,
name: string,
date: jsDate
}



B------> Get Wallet Details

URL /wallet/{walletId}
Method GET
Body
Response {

walletId: number / string,
balance: number,
name: string,
createdAt: jsDate
}



C------> Add credit to the wallet

URL /wallet/{walletId}/transaction
Method POST
Body { amount: number, description: string }
Response {

balance: number,
transactionId: number / string,
description: string,
type: credit
createdAt: jsDate
}



D------> Product Listing

URL /products
Method GET
Body
Response [
{
productId: number / string,
amount: number,
description: string,
},
....
]



E------> Make a purchase

URL /wallet/{walletId}/purchase
Method POST
Body { productId: number / string }
Response {

balance: number,
transactionId: number / string,
description?: string, // optional
type: debit
productId: number / string
createdAt: jsDate
}




F------> List transactions history

URL /wallet/{walletId}/transaction
Method GET
Body
Response [
{
balance: number,
transactionId: number / string,
description: string,
productId: number / string, // optional
type: credit / debit,
createdAt: jsDate
},
....
]

