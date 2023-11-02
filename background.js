//sets how many top coins to fetch
let numOfTopCoins = 3;

// Check whether new version is installed


//fetch data for the top coins
const getTopCoins = (num) => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=false`)
    .then(response => response.json())
    .then(data => {chrome.storage.local.set({ coinData: data});})
    .catch(error => console.error(error));
  };

//formats the price to be shown in proper shortened version on the ext badge  
const formatPrice = n => {
    if (n >= 1e6) return String(+(n / 1e6).toFixed(1)) + "M";
    if (n >= 1e3) return String(+(n / 1e3).toFixed(1)) + "K";
    if (n < 1e3) return String(n);
};



//updates the bitcoin price to be shown in the badge 
const refreshBadge = () => {
    let url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2"
    fetch(url).then(response => response.json()).then(response => {
        let price = formatPrice(response["bitcoin"]["usd"]);
        let currTime = new Date();
        console.log("badge reset at: " + currTime.toLocaleString());
        chrome.action.setBadgeText({text: price});
    });
};

//handles refreshing
const dataRefreshRate = 60;
getTopCoins(numOfTopCoins);
//setInterval(() => getTopCoins(numOfTopCoins), 1000 * dataRefreshRate);