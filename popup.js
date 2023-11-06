//the number of chars to what a coin name must be abbreviated to (to contain popup width)
const maxChars = 10;

//updates the dom element that show last time data was updated
const updateTime = (lastUpdate) => {
   let updateSpan = document.getElementById("update-time");
   updateSpan.innerText = lastUpdate;
}
//returns an abbreviated and dotted string
const abbreviate = (str, length) => {
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length) + "...";
};

//generate a coin slot with name and price for every coin in the data stored locally
const generateCoinSlots = (data) => {
  data.forEach((coin) => {
    let id = coin.id;
    let name = coin.name;
    let price = (Math.round(coin.current_price * 100) / 100).toFixed(2);
    price = Number(price).toLocaleString();
    price = price.toLocaleString();
    let box = document.getElementById("coin-box");
    let priceCell = document.createElement("div");
    priceCell.classList.add("price-cell");
    let nameH3 = document.createElement("h3");
    nameH3.innerText = abbreviate(name, maxChars);
    priceCell.appendChild(nameH3);
    let priceH3 = document.createElement("h3");
    let priceSpan = document.createElement("span");
    priceSpan.classList.add("coin");
    priceSpan.setAttribute("id", id);
    priceSpan.innerText = "$" + price;
    priceH3.appendChild(priceSpan);
    priceCell.appendChild(priceH3);
    box.appendChild(priceCell);
  });
};

//updates the title to show how many coins will be listed if the value is dynamic (per settings)
const updateTitle = (num) => {
  let title = document.querySelector("#title > span:first-of-type");
  title.innerText = num;
}
//updateTitle(numOfCoins);

//retrieve the coin data stored locally by the service worker 
//and calls back the functions to populate the popup with the data
//(gets executed every time the popup opens)
chrome.storage.local.get(null, function(result) {
  console.log(result.coinData);
  generateCoinSlots(result.coinData);
  updateTime(result.lastUpdate);
});






