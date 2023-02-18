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
        let currTime = new Date();
        console.log("badge reset at: " + currTime.toLocaleString());
        chrome.action.setBadgeText({text: price});
    });
};

const resetApiCalls = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ apiCalls: 0 }, () => {
        resolve("Api calls reset");
      });
    });
};

let apiCallsPromise = Promise.resolve(); // Initialize a Promise that is already resolved
const updateApiCalls = () => {
  apiCallsPromise = apiCallsPromise.then(() => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('apiCalls', function(items) {
        const newApiCalls = items.apiCalls ? items.apiCalls + 1 : 1;
        chrome.storage.local.set({ 'apiCalls': newApiCalls }, function() {
          console.log('Updated apiCalls:', newApiCalls); // Add a console.log statement here
          resolve(newApiCalls);
        });
      });
    });
  });
  return apiCallsPromise; // Return the Promise so that callers can wait for it to resolve
};  

const getApiCalls = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("apiCalls", (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          console.log(result.apiCalls)  
          resolve("returned apiCalls" + result.apiCalls);
        }
      });
    });
}

//handles badge refreshing
const badgeRefreshRate = 60;
refreshBadge();
setInterval(refreshBadge, 1000 * badgeRefreshRate);





