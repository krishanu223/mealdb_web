let favi = document.querySelector('.fav');
let fi = document.getElementById('fab');
let cl = document.getElementById('close');
fi.addEventListener('click', showfav);
cl.addEventListener('click', closefav);

function showfav() {
    favi.style = 'visibility:visible;right:0px;width:30%';
}

function closefav() {
    favi.style = 'visibility:visible;right:-220px;width:0';
}


// async function fetchmeal() {
//     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
//     const res = await data.json();
//     console.log(res)
// }
// fetchmeal();