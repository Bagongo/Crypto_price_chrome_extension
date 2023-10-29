const generateURL = (coin) => {
    return `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&precision=2`
};

const callAPI = (url, coin) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        let cell = document.getElementById(coin);
        let price = String(response[coin]["usd"]);
        cell.innerHTML = price;
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
   updateSpan.innerHTML = currTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

const generateCoinSlots = (data) => {
  data.forEach((coin) => {
    let id = coin.id;
    let name = coin.name;
    let price = coin.current_price;
    let box = document.getElementById("coin-box");
    let slot = document.createElement("div");
    slot.innerHTML = `<div class="price-cell">
                        <h3>${name}</h3>
                        <h3>$<span class="coin" id="${id}">${price}</span></h3>
                      </div>`;
    box.appendChild(slot);
    console.log(coin.name + " " + coin.current_price);
  });
};

const getTopCoins = (num) => {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=false`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    generateCoinSlots(data);
  })
  .catch(error => console.error(error));
};

console.log("opened 1")

let top5 = getTopCoins(5);
//populateCoins();






