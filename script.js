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
document.addEventListener('click', clickhandle);


function clickhandle(e) {
    if (e.target.className ==
        "btn btn-primary but") {
        fetching(e)
        favcounter = favlistitem.length;
        favc.innerHTML = favcounter + 1;

    }
    if (e.target.className == "material-icons") {
        deleteTask(e.target.id);
        renderfavlist();
        favcounter = favlistitem.length;
        favc.innerHTML = favcounter;

    }
    if (e.target.className == "card-img-top ") {
        pop.style = "visibility:visible;opacity:1";
        fetchdetail(e);

    }
    if (e.target.className == " details material-icons ") {
        pop.style = "visibility:hidden;opacity:0";
    }
}
async function fetchdetail(e) {

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.id}`);
    const res = await data.json();
    detaildom(res.meals[0]);


}

function detaildom(task) {
    // itemdetail.classList.add('detail');
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


async function fetching(e) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.id}`);
    const res = await data.json();
    favlistitem.push(res.meals[0]);
    renderfavlist()

}

function deleteTask(taskId) {
    const newtask = favlistitem.filter((meals) => {
        return meals.idMeal !== taskId;
    })
    favlistitem = newtask;

}


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
    for (let i = 0; i < favlistitem.length; i++) {
        addfavtodomfav(favlistitem[i])

    }
}


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
/*********************************The end *****************************/
async function fetchmeal() {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${si.slice(0,1)}`);
    const res = await data.json();
    iteamlist = res.meals;
    console.log(iteamlist)

    function addtasksTodom(task) {
        const mealiitem = document.createElement('div');
        mealiitem.classList.add('card', 'm-2');
        mealiitem.innerHTML = `<img class="card-img-top " id=${task.idMeal} src="${task.strMealThumb
        }" alt="Card image cap "><div class="card-body ">
        <h5 class="card-title " style="overflow-y: hidden; ">${task.strMeal.slice(0,20)}
        </h5>
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
        secresult.innerHTML = `<h2>Your search reasult for ${search.value}(${iteamlist.length} items)<h2>`
    }
}