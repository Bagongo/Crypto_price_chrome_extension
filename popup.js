let numOfCoins = 3;

const generateURL = (coin) => {
    return `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&precision=2`
};

const lastUpdate = () => {
   let updateSpan = document.getElementById("update-time");
   let currTime = new Date();
   updateSpan.innerText = currTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

const generateCoinSlots = (data) => {
  data.forEach((coin) => {
    let id = coin.id;
    let name = coin.name;
    let price = (Math.round(coin.current_price * 100) / 100).toFixed(2);
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
    //console.log(coin.name + " " + coin.current_price);
  });
  lastUpdate();
};

const updateTitle = (num) => {
  let title = document.querySelector("#title > span:first-of-type");
  title.innerText = num;
}

const getTopCoins = (num) => {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=false`)
  .then(response => response.json())
  .then(data => {
    generateCoinSlots(data);
  })
  .catch(error => console.error(error));
};

getTopCoins(numOfCoins);
//updateTitle(numOfCoins);
//populateCoins();






