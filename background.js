//hardcoded number of how many top coins to fetch
//(use a large number and narrow how many coins are displayed in popup.js
let numOfTopCoins = 100;
//harcoded calue for decimal precision of prices to fetch
let decimalPrecision = 8;
//handles refresh rate of data
const dataRefreshRate = 60;

// Check whether new version is installed and intialize data + badges
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});

//initialize badge and data
const initApp = () => {
    chrome.action.setBadgeBackgroundColor({ color:'#1B73E8'});
    refreshBadge();
    getTopCoins(numOfTopCoins);
};

//returns the current time in proper format
const returnCurrentTime = () => {
    currTime = new Date();
    return currTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
};

//fetch data for the top coins
const getTopCoins = (num, precision) => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=false&precision=${precision}`)
    .then(response => response.json())
    .then(data => {
        let localData = {coinData: data, lastUpdate: returnCurrentTime()};
        chrome.storage.local.set(localData);
        console.log("coin data refreshed at: " + returnCurrentTime());
    })
    .catch(error => console.error("There a was a problem while fetcing the coin data.", error));
  };

//formats the price to be shown in proper shortened version on the ext badge  
const formatPrice = n => {
    let price = n;
    let magnitude = "";
    if (price >= 1e6){
        price = (+(price / 1e6).toFixed(1)); //add '+ "M"' if logic allows longer text to fit in the badge;
        magnitude = "m";
    }     
    else if (price >= 1e3) {
        price = (+(price / 1e3).toFixed(1)); //add '+ "K"' if logic allows longer text to fit in the badge;
        magnitude = "k";
    }
    else if (price < 1e3){
        price = Math.round(price);
    }
    price = String(price);
    return price.length <= 3 ? price + magnitude : price;
};

//refresh bitcoin price to be shown in the badge 
const refreshBadge = () => {
    let url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2";
    fetch(url)
    .then(response => {
        if (!response.ok) {throw new Error("Network response was not ok");}
        return response.json();
    })
    .then(response => {
        let price = formatPrice(response["bitcoin"]["usd"]);
        chrome.action.setBadgeText({text: price});
        console.log("badge refreshed at: " + returnCurrentTime());
    })
    .catch(error => {
        console.error("There was a problem with the badge update.", error);
    });
};

initApp();

//refresh badge routine
setInterval(() => refreshBadge(), 1000 * dataRefreshRate);
//refresh coin data routine
setInterval(() => getTopCoins(numOfTopCoins, decimalPrecision), 1000 * dataRefreshRate);

