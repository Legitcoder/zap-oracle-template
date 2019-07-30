const axios = require("axios");
const web3 = require('web3');

export async function getResponse(query:string,params:string[]|[]){
	console.log("Hello World");
	var symbol = params[1];
	var weiPrice = 0;
	var response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ZAP&tsyms=ETH`);
	var zapEthPrice = response.data.ETH;
	var zapWeiPrice = web3.utils.toWei(zapEthPrice.toString(), 'ether');

	switch (query) {
		case "cryptocurrency":
			var crptoCompareAPIResponse = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=ETH`);
			var ethPrice = crptoCompareAPIResponse.data.ETH;
			weiPrice = web3.utils.toWei(ethPrice.toString(), 'ether');
			break;
		case "stock":
				var stockAPIResponse = await axios.get(`https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=VaXzwAA2heFdNNk3mRM8kLqHXG3voOsPpKzxQHAKyo9pIay8e5KgPWhP6Huf`);
				if(!stockAPIResponse.data.data) break;
				var usd = stockAPIResponse.data.data[0].price;
				var crptoCompareAPIResponse = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH`);
				var oneUsdInETH = crptoCompareAPIResponse.data.ETH;
				var oneUsdInWei = web3.utils.toWei(oneUsdInETH.toString(), 'ether');
				weiPrice = oneUsdInWei * usd
				console.log(weiPrice)
			break;
		default:
			console.log("Error with Query");
			break;
	}
	return ["" + zapWeiPrice, "" + weiPrice]
}


//getResponse("stock", ["APPL"]);
