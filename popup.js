//the number of chars to what a coin name must be abbreviated to (to contain popup width)
const maxChars = 10;
// the number of max precision to decimal notation in prices
const maxPrecision = 8;
//the counter value to match coins against (can implement dynamicity)
const counterValue = "$";
//how many coins to display (as a maximum in settings)
const maxCoins = 100;

//(in settings) gets the input for number of coins to be shown and sanitize it (and set its min/max values)
const numOfCoinsInput = document.getElementById('input-numofcoins');
numOfCoinsInput.min = 1;
numOfCoinsInput.max = maxCoins;
numOfCoinsInput.addEventListener('input', (event) => {
  let input = Math.max(Math.min(parseInt(event.target.value), maxCoins), 1);
  event.target.value = isNaN(input) ? '' : input;
  chrome.storage.local.set({"numOfcoinsToDisplay":input});
});

//selects and swithces classes to the setting panel to bring it in and off window
const settingsPanel = document.getElementById("options");
const settingsBTN = document.getElementsByClassName("settings-button")[0].addEventListener("click", ()=>{
  settingsPanel.classList.remove("closed");
  settingsPanel.classList.add("opened");
});
const quitSettingsBTN = document.getElementsByClassName("quit-settings")[0].addEventListener("click", ()=>{
  settingsPanel.classList.remove("opened");
  settingsPanel.classList.add("closed");
  updatePopup();
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

//clearas the container for all the coin slots
const clearCoinslots = () => {
  let box = document.getElementById("coin-box");
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
};

//generate a coin slot with name and price for every coin in the data stored locally
const generateCoinSlots = (data, num) => {
  for (let i = 0; i < num; i++) {
    let coin = data[i];
    let price = formatPrice(coin.current_price, maxPrecision);
    let box = document.getElementById("coin-box");
    let priceCell = document.createElement("div");
    priceCell.classList.add("coin-cell");
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
    let coinName = abbreviate(coin.name, maxChars);
      if(coinName !== coin.name) {
      let tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.innerText = coin.name;
      priceCell.appendChild(tooltip);
    } 
    link.innerText = coinName;
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
  let spanElements = document.querySelectorAll("#title > span");
  spanElements[0].innerText = num;
  let coinConjugation = num > 1 ? "Coins" : "Coin";
  spanElements[1].innerText = coinConjugation;
}

//updates the dom element that show last time data was updated
const updateTime = (lastUpdate) => {
  let updateSpan = document.getElementById("update-time");
  updateSpan.innerText = lastUpdate;
}

//retrieve the coin data stored locally by the service worker 
//and calls back the functions to populate the popup with the data
//(gets executed every time the popup opens)
const updatePopup = () => {
  chrome.storage.local.get(null, function(result) {
    console.log(result.coinData);
    numOfCoinsInput.value = result.numOfcoinsToDisplay;
    clearCoinslots();
    generateCoinSlots(result.coinData, result.numOfcoinsToDisplay);
    updateTitle(result.numOfcoinsToDisplay);
    updateTime(result.lastUpdate);
  });
};

updatePopup();





