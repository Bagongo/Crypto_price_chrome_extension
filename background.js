// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});

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
        chrome.action.setBadgeText({text: price});
    });
};

refreshBadge();
