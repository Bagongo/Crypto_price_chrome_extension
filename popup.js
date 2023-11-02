const lastUpdate = (updateTime) => {
   let updateSpan = document.getElementById("update-time");
   updateSpan.innerText = updateTime;
}

const generateCoinSlots = (data) => {
  data.forEach((coin) => {
    let id = coin.id;
    let name = coin.name;
    let price = (Math.round(coin.current_price * 100) / 100).toFixed(2);
    price = Number(price).toLocaleString();
    console.log(typeof(price));
    price = price.toLocaleString();
    let box = document.getElementById("coin-box");
    let priceCell = document.createElement("div");
    priceCell.classList.add("price-cell");
    let nameH3 = document.createElement("h3");
    nameH3.innerText = name;
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

const updateTitle = (num) => {
  let title = document.querySelector("#title > span:first-of-type");
  title.innerText = num;
}
chrome.storage.local.get(null, function(result) {
  console.log(result);
  generateCoinSlots(result.coinData);
  lastUpdate(result.lastUpdate);
});

//updateTitle(numOfCoins);





