const btc = document.getElementById("bitcoin");

console.log("working!");

const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2";

const formatPrice = n => {
    if (n >= 1e6) return String(+(n / 1e6).toFixed(1)) + "M";
    if (n >= 1e3) return String(+(n / 1e3).toFixed(1)) + "K";
    if (n < 1e3) return String(n);
};
  
const callAPI = () => { fetch(API_URL).then(response => response.json()).then(response => {
    console.log(response)
    let price = String(response.bitcoin.usd);
    btc.innerHTML = price;
    chrome.action.setBadgeText({text: formatPrice(price)});
    });
}


callAPI();
setTimeout(callAPI, 10000);


