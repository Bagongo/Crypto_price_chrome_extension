//the number of chars to what a coin name must be abbreviated to (to contain popup width)
const maxChars = 10;
//the number of how many coins will displayed
const numOfcoinsToDisplay = 100;
// the number of max precision to decimal notation in prices
const maxPrecision = 8;
//the counter value to match coins against (can implement dynamicity)
const counterValue = "$";

//updates the dom element that show last time data was updated
const updateTime = (lastUpdate) => {
   let updateSpan = document.getElementById("update-time");
   updateSpan.innerText = lastUpdate;
}

//selects and swithces classes to the setting panel to bring it in and off window
const settingsPanel = document.getElementById("options");
const settingsBTN = document.getElementsByClassName("settings-button")[0].addEventListener("click", ()=>{
  settingsPanel.classList.remove("closed");
  settingsPanel.classList.add("opened");
});
const quitSettingsBTN = document.getElementsByClassName("quit-settings")[0].addEventListener("click", ()=>{
  settingsPanel.classList.remove("opened");
  settingsPanel.classList.add("closed");
});


//returns an abbreviated and dotted string
const abbreviate = (str, length) => {
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length) + "...";
};

const formatPrice = (price, maxPrecision) => {
    if (price <= 0) {
        let formattedPrice = price.toFixed(maxPrecision);
        return formattedPrice; 
    }
    if (price > 0.01) {
        let formattedPrice = (Math.round(Number(price) * 100) / 100).toFixed(2);
        return formattedPrice.toLocaleString();
    }
    else {
        let formattedPrice = price.toFixed(1-Math.floor(Math.log(price)/Math.log(10)));
        return formattedPrice;
    }
};

//generate a coin slot with name and price for every coin in the data stored locally
const generateCoinSlots = (data, num) => {
  for (let i = 0; i < num; i++) {
     let coin = data[i];
     let price = formatPrice(coin.current_price, maxPrecision);
     let box = document.getElementById("coin-box");
     let priceCell = document.createElement("div");
     priceCell.classList.add("price-cell");
     priceCell.setAttribute("id", coin.id);
     let h3 = document.createElement("h3");
     priceCell.appendChild(h3);
     let rankSpan = document.createElement("span");
     rankSpan.classList.add("coin-rank");
     rankSpan.innerText = coin.market_cap_rank + " "; 
     h3.appendChild(rankSpan);
     let nameSpan = document.createElement("span");
     nameSpan.classList.add("coin-name");
     let link = document.createElement("a");
     link.setAttribute("href", `https://www.coingecko.com/en/coins/${coin.id}`);
     link.setAttribute("target", "_blank");
     link.innerText = abbreviate(coin.name, maxChars);
     nameSpan.appendChild(link);
     h3.appendChild(nameSpan);
    let priceSpan = document.createElement("span");
     priceSpan.classList.add("coin-price");
     priceSpan.innerText = counterValue + price;
     h3.appendChild(priceSpan);
     box.appendChild(priceCell);
  }
 };

//updates the title to show how many coins will be listed if the value is dynamic (per settings)
const updateTitle = (num) => {
  let title = document.querySelector("#title > span:first-of-type");
  title.innerText = num;
}

//retrieve the coin data stored locally by the service worker 
//and calls back the functions to populate the popup with the data
//(gets executed every time the popup opens)
chrome.storage.local.get(null, function(result) {
  console.log(result.coinData);
  generateCoinSlots(result.coinData, numOfcoinsToDisplay);
  updateTitle(numOfcoinsToDisplay);
  updateTime(result.lastUpdate);
});





