// Import the ethers library
const ethers = require('ethers');

// Define the Ethereum JSON RPC URL
var url = 'https://eth-sepolia.g.alchemy.com/v2/ZdizMbGfOfUDnGZBli0ciCFs14I-qk-T';

// Define the Ethereum account address you want to monitor
const accountAddress = '0x4A859F03f3DF73041Ee8EACe087828E7272CE96A';

// Create a new JSON RPC provider
const provider = new ethers.JsonRpcProvider(url);

// Define the function to monitor transactions
async function monitorTransactions() {
  // Log the account being monitored
  console.log(`Monitoring transactions for account: ${accountAddress}`);

  // Listen for new blocks
  provider.on('block', async (blockNumber) => {
    try {
      // Get the block details
      let block = await provider.getBlock(blockNumber);
      
      // Loop through all transactions in the block
      for (let transactionHash of block.transactions) {
        // Get the transaction details
        let transaction = await provider.getTransaction(transactionHash);
        
        // Check if the transaction involves the monitored account
        if (transaction && (transaction.from === accountAddress || transaction.to === accountAddress)) {
          console.log('New Transaction:');
            console.log(transaction);
          // Log the transaction details
          // console.log('Block Number:', blockNumber);
          // console.log('Transaction Hash:', transaction.hash);
          // console.log('From:', transaction.from);
          // console.log('To:', transaction.to);
          // Check if the transaction has a value
          // if (transaction.value) {
          //   // Convert the value from wei to ether and log it
          //   console.log('Value:', ethers.utils.parseUnits(transaction.value.toString(), 'wei').toString(), 'ETH');
          // } else {
          //   console.log('Value: 0 ETH');
          // }
          console.log('------------------------------------');
        }
      }
    } catch (error) {
      // Log any errors
      console.error('Error getting block:', error);
    }
  });
}

// Start monitoring transactions
monitorTransactions().catch(console.error);