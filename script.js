//const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2";

const generateURL = (coin) => {
    return `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&precision=2`
};

const formatPrice = n => {
    if (n >= 1e6) return String(+(n / 1e6).toFixed(1)) + "M";
    if (n >= 1e3) return String(+(n / 1e3).toFixed(1)) + "K";
    if (n < 1e3) return String(n);
};

const callAPI = (url,coin) => { fetch(url).then(response => response.json()).then(response => {
    console.log(response[coin]["usd"]);
    let cell = document.getElementById(coin);
    let price = String(response[coin]["usd"]);
    cell.innerHTML = price;
});
}

document.querySelectorAll('.coin').forEach(function(span) {
    console.log(span);
    let coin = String(span.id);
    let url = generateURL(coin)
    callAPI(url, coin); 
});



