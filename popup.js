let numOfCoins = 3;

const generateURL = (coin) => {
    return `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&precision=2`
};

const callAPI = (url, coin) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        let cell = document.getElementById(coin);
        let price = String(response[coin]["usd"]);
        cell.innerText = price;
        console.log(coin + " updated")
      })
      .catch(error => {
        console.error("Error fetching API:", error);
      });
  };

const populateCoins = () =>{
    console.log('Populating coins...');
    document.querySelectorAll('.coin').forEach(function(span) {
        let coin = String(span.id);
        let url = generateURL(coin)
        callAPI(url, coin); 
    }); 
    lastUpdate();
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
    let price = coin.current_price;
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
    priceSpan.innerText = "$ " + price;
    priceH3.appendChild(priceSpan);
    priceCell.appendChild(priceH3);
    // slot.innerHTML = `<div class="price-cell">
    //                     <h3>${name}</h3>
    //                     <h3>$<span class="coin" id="${id}">${price}</span></h3>
    //                   </div>`;
    box.appendChild(priceCell);
    console.log(coin.name + " " + coin.current_price);
  });
  lastUpdate();
};

const updateTitle = (num) => {
  let title = document.querySelector("#title > span:first-of-type");
  title.innerText = num;
  console.log(num, title);
}

const getTopCoins = (num) => {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=false`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    generateCoinSlots(data);
  })
  .catch(error => console.error(error));
};

getTopCoins(numOfCoins);
//updateTitle(numOfCoins);
//populateCoins();






