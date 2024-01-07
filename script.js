let favi = document.querySelector('.fav');
let fi = document.getElementById('fab');
let cl = document.getElementById('close');

if (window.innerWidth < 768) {
    fi.addEventListener('click', showfav);
    cl.addEventListener('click', closefav);
} else {
    fi.addEventListener('click', showfavb);
    cl.addEventListener('click', closefavb);
}

function showfavb() {
    favi.style = 'visibility:visible;right:0px;width:30%';
}

function closefavb() {
    favi.style = 'visibility:visible;right:-0px;width:0';
}

function showfav() {
    favi.style = 'visibility:visible;right:0px;width:70%';
}

function closefav() {
    favi.style = 'visibility:visible;right:-0px;width:0';
}


// async function fetchmeal() {
//     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
//     const res = await data.json();
//     console.log(res)
// }
// fetchmeal();