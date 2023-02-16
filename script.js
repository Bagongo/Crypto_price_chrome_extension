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
        let cell = document.getElementById(coin);
        let price = String(response[coin]["usd"]);
        cell.innerHTML = price;
    });
};

const refreshBadge = () => {
    fetch(generateURL("bitcoin")).then(response => response.json()).then(response => {
        let price = formatPrice(response["bitcoin"]["usd"]);
        chrome.action.setBadgeText({text: price});
    });
};

document.querySelectorAll('.coin').forEach(function(span) {
    let coin = String(span.id);
    let url = generateURL(coin)
    callAPI(url, coin); 
});

refreshBadge();





