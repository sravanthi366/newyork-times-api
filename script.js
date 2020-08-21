/* ---------creating a div with container class----- */
let array = ['world', 'politics', 'magazine', 'technology', 'science', 'health', 'sports', 'arts', 'fashion', 'food', 'travel']
let date_month = ['January', "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let main_container = document.createElement('div')
main_container.classList.add('container')

let header = document.createElement('header')
header.classList.add('head', 'bg-primary', 'text-light', 'text-center')
header.innerHTML = `<h2>Latest News</h2>`

/* -----creating a row for nav bar -------------------- */
let row_1 = document.createElement('row')
row_1.classList.add('row')


let col_1 = document.createElement('col')
col_1.classList.add('col', 'py-3', 'px-lg-4', 'border', 'bg-light')


let nav_bar = document.createElement('nav')
nav_bar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-warning', 'text-light')

let button = document.createElement('button')
button.classList.add('navbar-toggler')
button.setAttribute('type', 'button')
button.setAttribute('data-toggle', 'collapse')
button.setAttribute('data-target', '#navbarNav')
button.setAttribute('aria-controls', 'navbarNav')
button.setAttribute('aria-expanded', 'false')
button.setAttribute('aria-label', 'Toggle navigation')

nav_bar.append(button)
let span = document.createElement('span')
span.classList.add('navbar-toggler-icon')
button.append(span)

let nav_div = document.createElement('div')
nav_div.classList.add('collapse', 'navbar-collapse')
nav_div.setAttribute('id', 'navbarNav')
let buttons = nav(array);
nav_div.append(buttons)


/* ------creating a card */

let col_2 = document.createElement('col');
col_2.classList.add('row');
col_2.id = 'contentRow';




/* -------------------fetching data through api------------- */


async function newsData(section) {
    let url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=8GGvmXVEL8BMC8R8aKIrfgL028kA0Yxu'

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    try {
        //await sleep(2000)
        let data = await fetch(url);
        let data_result = await data.json();
        cardInfo(data_result.results)
        await sleep(3000)

    } catch (error) {
        console.log(error);
    }

}


function nav(arr) {
    let f = document.createElement('form');
    f.classList.add('form-inline');
    arr.forEach(element => {
        let nav1 = document.createElement('input');
        nav1.type = 'button'
        nav1.classList.add('btn');
        nav1.id = element.toLowerCase();
        nav1.value = element;
        nav1.innerText = element;
        nav1.setAttribute('onclick', 'newsData(this.id)');
        f.append(nav1);

    });

    return f;
}


function cardInfo(arr) {
    console.log(arr)
    col_2.innerHTML = '';
    arr.forEach(ele => {
        let cardCol = document.createElement('div');
        cardCol.classList.add('col-12', 'm-2', 'card');
        cardCol.setAttribute('style', 'margin-left:130%')
        let cardrow = document.createElement('div');
        cardrow.classList.add('row');
        let card = document.createElement('div');
        card.classList.add('col', 'cardBody');
        let title = document.createElement('div');
        title.classList.add('titlecard')
        title.innerText = ele.title;
        card.append(title);
        let item_type = document.createElement('div');
        item_type.classList.add('item_typecard')
        item_type.innerText = ele.item_type;
        card.append(item_type);

        let abstract = document.createElement('div');
        abstract.classList.add('abstractcard')
        abstract.innerText = ele.abstract;
        card.append(abstract);

        let byline = document.createElement('div');
        byline.classList.add('bylinecard')
        byline.innerText = ele.byline;
        card.append(byline);
        let created_date = document.createElement('div');
        created_date.classList.add('datecard')
        created_date.innerText = date_month[new Date(ele.created_date).getMonth()] + '  ' + new Date(ele.created_date).getDate();
        card.append(created_date);
        let a1 = document.createElement('a');
        a1.href = ele.short_url;
        let continueBtn = document.createElement('div');
        continueBtn.classList.add('continueReading', 'btn', 'btn-link');
        continueBtn.innerHTML = 'Continue reading'
        a1.append(continueBtn);
        card.append(a1);
        cardrow.append(card);
        let imgCol = document.createElement('div');
        imgCol.classList.add('col-4', 'card-img-top')
        let img = document.createElement('img');
        img.classList.add('img-thumbnail', 'image');
        img.src = ele.multimedia[(ele.multimedia.length - 1)].url;
        img.setAttribute('width', '400px')
        img.setAttribute('height', '400px')
        imgCol.append(img);
        cardrow.append(imgCol);
        cardCol.append(cardrow);
        document.getElementById('contentRow').append(cardCol);
    });

}

/* ----------appending-------- */
document.body.append(main_container)
main_container.append(header)
main_container.append(row_1)
row_1.append(col_1)
col_1.append(nav_bar)
nav_bar.append(nav_div)

row_1.append(col_2);

newsData('home')