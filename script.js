var favlistitem = [];
var favarray = [];
let pop = document.querySelector('.detail');
let favvlist = document.getElementById('list')
let favi = document.querySelector('.fav');
let fi = document.getElementById('fab');
let cl = document.getElementById('close');
let itemlist = document.querySelector('.mealitem');
let search = document.querySelector('.inp');
let serchbtn = document.getElementById('sic');
let favc = document.querySelector('.favcount');
let secresult = document.querySelector('.result');
let carrd = document.querySelector('.card');
let si;
let ind;
let favcounter = 1;
let closedetal = document.getElementById('closed');
let products = [];
let i = 0;
let fav = [];
let chk = {};
let sus = []
let susgeslist = document.querySelector('.sugestionlist')
let sugestn = document.querySelector('.sugestion')
document.addEventListener('click', clickhandle);

/*****************************sugestion list operation ************** */
susgeslist.addEventListener('click', function(e) {
    search.value = e.target.innerHTML;
    console.log(e.target.innerHTML)
    susgeslist.innerHTML = ""
    serc();
    sugestn.style.opacity = '0';


})
search.addEventListener('keyup', () => {
        sugestn.style.opacity = '1';

        function domli(task) {
            const li = document.createElement('li')
            li.innerHTML = `${ task.strMeal }`
            susgeslist.append(li)
        }

        function rendersuslist() {
            susgeslist.innerHTML = "";
            for (let i = 0; i < sus.length; i++) {
                domli(sus[i])
            }
        }

        sugestion(search.value)
        async function sugestion(i) {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`);
            const data = await res.json();
            sus = data.meals;
            rendersuslist();

            if (search.value) {
                if (sus.length != 0) {
                    sugestn.style.visibility = 'visible'
                } else {
                    sugestn.style.visibility = 'hidden'
                }
            } else {
                serc();
                sugestn.style.visibility = 'hidden'

            }

        }

    })
    /***************************************fetching data from local storage to api************** */
async function fetching(i) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${products[i]}`);
    const data = await res.json();
    favlistitem.push(data.meals[0]);
}
/************************** end fetching data from local storage to api************** */
/**********************************Local storage operation************************/
function addProduct(e) {

    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }
    if (e.target.className == "btn btn-primary but") {
        if (products.includes(e.target.id)) {
            alert("Already in fav item");
        } else {
            products.push(e.target.id);
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}
/*******************************Local storage data delete********************** */
function deleteaddProduct(e) {

    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
        let i = products.indexOf(e.target.id);
        products.splice(i);
        localStorage.setItem('products', JSON.stringify(products));
    }

}
/**********************************Local storage operation************************/
/**********************************page loading property************** */
window.addEventListener('load', (e) => {
    addProduct(e);
    for (i = 0; i < products.length; i++) {
        fetching(i);
    }
    favc.innerHTML = products.length;
});

async function currentfetch(e) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.id}`);
    const res = await data.json();

    favlistitem.push(res.meals[0]);


}
document.addEventListener("click", (e) => {
        console.log(e.target)
    })
    /*********************************Click handle of page element*************** */
function clickhandle(e) {
    if (e.target.className ==
        "btn btn-primary but") {
        currentfetch(e);
        addProduct(e);
        dupchk();
        console.log(fav);
        favc.innerHTML = products.length;

    }

    if (e.target.className == "material-icons") {
        deleteTask(e.target.id);
        deleteaddProduct(e)
        renderfavlist();
        favcounter = products.length;
        favc.innerHTML = favcounter;

    }
    if (e.target.className == "card-img-top ") {
        fetchdetail(e);
        pop.style = "visibility:visible;opacity:1";

    }
    if (e.target.className == " details material-icons ") {
        pop.style = "visibility:hidden;opacity:0";
    }
    if (e.target.className == "material-icons oo") {
        addProduct(e);
        dupchk();
        renderfavlist();
        console.log(favlistitem.length)
    }
}
/************************************product detail fetching from api***************** */
async function fetchdetail(e) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.id}`);
    const res = await data.json();
    detaildom(res.meals[0]);
}
/******************************detail page operation******************** */
function detaildom(task) {
    pop.innerHTML = `<i class=" details material-icons " id="closed">close</i><img src=${task.strMealThumb
    } alt="">
    <div id="dheading">
        <h3>${task.strMeal}</h3>
    </div>
    <div id="cat">
        <h5>Catagory:${task.strCategory
        }</h5>
    </div>
    <div id=recipi><h4>Recipe:</h4>
    ${task.strIngredient1} - ${task.strMeasure1}<br>
    ${task.strIngredient2} - ${task.strMeasure2}<br>
    ${task.strIngredient3} - ${task.strMeasure3}<br>
    ${task.strIngredient4} - ${task.strMeasure4}<br>
    ${task.strIngredient5} - ${task.strMeasure5}<br>
    ${task.strIngredient6} - ${task.strMeasure6}<br>
    ${task.strIngredient7} - ${task.strMeasure7}<br>
    ${task.strIngredient8} - ${task.strMeasure8}<br>
    ${task.strIngredient9} - ${task.strMeasure9}<br>
    ${task.strIngredient10} - ${task.strMeasure10}
    </div>

<div id="ins"><h3>Intruction:</h3></div>
    <div id="artical">${task.strInstructions}</div>
    `

}

/****************************delete item from favlist */
function deleteTask(taskId) {
    const newtask = fav.filter((meals) => {
        return meals.idMeal !== taskId;
    })
    fav = newtask;


}
/******************************************Favlist operation****************************/

function addfavtodomfav(task) {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${task.strMealThumb}" alt="slow">
    <label>${task.strMeal.slice(0,20)}
    <div ><i class="material-icons" id="${task.idMeal}" style="color:red;font-size: 20px; font-weight: 500;">close</i></div>
</label>`
    favvlist.append(li);
}

function renderfavlist() {
    favvlist.innerHTML = "";
    for (let i = 0; i <= fav.length; i++) {
        addfavtodomfav(fav[i])

    }
}


/******************************************Fav list operation complite*************************/
serchbtn.addEventListener('click', serc);
window.onload = function random() {
    si = "bghdhhgf";
    fetchmeal();
}
var iteamlist = [];



/********************meadia quary opearation for mobile screen **********************/
if (window.innerWidth < 768) {
    fi.addEventListener('click', showfav);
    cl.addEventListener('click', closefav);
} else {
    fi.addEventListener('click', showfavb);
    cl.addEventListener('click', closefavb);
}


function dupchk() {
    for (let i = 0; i < favlistitem.length; i++) {
        if (!chk[favlistitem[i].idMeal]) {
            chk[favlistitem[i].idMeal] = true;
            fav.push(favlistitem[i]);
        }
    }
}

function showfavb() {
    favi.style = 'visibility:visible;right:0px;width:30%';
    renderfavlist();
    dupchk();

}

function closefavb() {
    favi.style = 'visibility:visible;right:-0px;width:0';

}

function showfav(e) {
    favi.style = 'visibility:visible;right:0px;width:70%';
    renderfavlist();
    dupchk();
}

function closefav() {
    favi.style = 'visibility:visible;right:-0px;width:0';
}
/*********************************The end *****************************/
/***************************fetch mealdb meal by user input*************** */
async function fetchmeal() {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`);
    const res = await data.json();
    iteamlist = res.meals;
    console.log(iteamlist)
        /********************************main page rendering*************** */
    function addtasksTodom(task) {
        const mealiitem = document.createElement('div');
        mealiitem.classList.add('card', 'm-2');
        mealiitem.innerHTML = `<img class="card-img-top " id=${task.idMeal} src="${task.strMealThumb
        }" alt="Card image cap " ><div class="card-body ">
        <h5 class="card-title " style="overflow-y: hidden; ">${task.strMeal.slice(0,20)}
        </h5>
        <a class="card-img-top " id=${task.idMeal} >Detail</a>
        <a  class="btn btn-primary but" id="${task.idMeal}">Add favorite</a>
        <a href="${task.strYoutube}" class="btn btn-primary youbut">YT</a>
      
        
    </div>`
        itemlist.append(mealiitem);
    }

    function renderList() {
        itemlist.innerHTML = "";
        for (let i = 0; i < iteamlist.length; i++) {
            addtasksTodom(iteamlist[i])

        }
    }
    renderList()
}

function serc() {

    if (search) {
        si = search.value;
        fetchmeal();
        secresult.innerHTML = `<h2>Your search reasult for ${search.value}<h2>`
    }
}