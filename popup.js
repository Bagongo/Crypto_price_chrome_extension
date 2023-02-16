const generateURL = (coin) => {
    return `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&precision=2`
};

const callAPI = (url,coin) => { fetch(url).then(response => response.json()).then(response => {
        let cell = document.getElementById(coin);
        let price = String(response[coin]["usd"]);
        cell.innerHTML = price;
    });
};

document.querySelectorAll('.coin').forEach(function(span) {
    let coin = String(span.id);
    let url = generateURL(coin)
    callAPI(url, coin); 
});






