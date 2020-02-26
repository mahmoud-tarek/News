let news;
let country = 'eg';
let category = 'general';
let term = '';
let url = `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=dc713dd7d4b34d798cf2936a07ffb7b7`;
let url2 = `http://newsapi.org/v2/everything?q=${term}&from=2020-01-26&sortBy=publishedAt&apiKey=dc713dd7d4b34d798cf2936a07ffb7b7`;

function updateUrl()
{ 
    url = `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=dc713dd7d4b34d798cf2936a07ffb7b7`;
}

function updateUrl2()
{ 
    url2 = `http://newsapi.org/v2/everything?q=${term}&from=2020-01-26&sortBy=publishedAt&apiKey=dc713dd7d4b34d798cf2936a07ffb7b7`;
}

const getNews = url =>
{
    let req;
    window.XMLHttpRequest ? req = new XMLHttpRequest() : req = new ActiveXObject("Microsoft.XMLHTTP"); 

    req.open("GET", url);
    req.send();

    req.onreadystatechange = () => 
    {
        console.log(req.readyState)
        if(req.status == 200 && req.readyState == 4)
        {
            news = JSON.parse(req.response);
            news = news.articles;
            postNews();
        }
    }
};

getNews(url);

function postNews()
{
    let temp = "";
    for(let i=0 ; i<news.length ; i++)
    {
        temp += `<div class="col-lg-3 col-md-4 col-sm-6">
                 <a href="${news[i].url}" target="blank">
                    <div><img src="${news[i].urlToImage}" class="img-fluid"/></div>
                    <h5>${news[i].title}</h5>
                    <p>${news[i].description}</p>
                    </a>
                </div>`;
    }
    $('#row').html(temp);
};

$('.nav-link').click(function()
{    
    category = this.innerHTML;
    updateUrl();
    getNews(url);
});

$('#input').keyup(function(){
    term = this.value;
    updateUrl2();
    console.log(term+' '+url2)
    getNews(url2);
});

/*----------Side Bar----------*/

$('#arrow').click(() =>
{
    $('#side-bar').fadeOut(500,function(){
        $('#side-bar').toggleClass('case2');
        $('#arrow').children().toggleClass('rotate');
    });
    $('#side-bar').fadeIn(500);
});

$('.side-link').click( function() {
    country = this.innerHTML;
    updateUrl();
    getNews(url);
});