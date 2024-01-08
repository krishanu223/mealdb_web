let favi = document.querySelector('.fav');
let fi = document.getElementById('fab');
let cl = document.getElementById('close');
let itemlist = document.querySelector('.mealitem');
let search = document.querySelector('.inp');
let serchbtn = document.getElementById('sic');
let si;
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
        mealiitem.innerHTML = `<img class="card-img-top " src="${task.strMealThumb
        }" alt="Card image cap "><div class="card-body ">
        <h5 class="card-title " style="overflow-y: hidden; ">${task.strMeal.slice(0,20)}
        </h5>
        <a href="# " class="btn btn-primary " id="btu ">Add favorite</a>
    </div>`
        itemlist.append(mealiitem);
    }

    function renderList() {
        itemlist.innerHTML = "";
        for (let i = 0; i < iteamlist.length; i++) {
            addtasksTodom(iteamlist[i])
            console.log(i)
        }
    }
    renderList()
}


function serc() {
    if (search) {
        si = search.value;
        fetchmeal();
    }
}