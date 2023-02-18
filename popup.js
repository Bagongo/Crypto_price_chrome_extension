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
   updateSpan.innerHTML = currTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});;
}

populateCoins();






