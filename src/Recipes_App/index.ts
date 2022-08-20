/* eslint-disable no-new */

// ? ---------------- Recipe API ------------------ //

const optionsRecipe = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '272aa05610msh8dd4288095fc163p19764ejsn3886770f20a2',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
};

const getRecipe = (name: string) => new Promise((resolve, reject) => {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${name}&instructionsRequired=true`, optionsRecipe)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((error) => reject(error));
});

// ? ---------------- Google API ------------------ //

const optionsImage = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '272aa05610msh8dd4288095fc163p19764ejsn3886770f20a2',
        'X-RapidAPI-Host': 'google-image-search1.p.rapidapi.com',
    },
};

const getImage = (name: string) => new Promise((resolve, reject) => {
    fetch(`https://google-image-search1.p.rapidapi.com/v2/?q=${name}&hl=en`, optionsImage)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((err) => reject(err));
});

// ? ---------------- Classes Array ------------------ //

const cardClasses: string[] = ['bg-slate-700', 'rounded', 'pb-1', 'w-full', 'click'];

const imgCardClasses: string[] = ['w-full', 'object-cover', 'rounded', 'lg:h-48', 'h-96'];

const paraphCardClasses: string[] = ['flex', 'justify-center'];

// ? ---------------- Search Recipe ------------------ //

function search() {
    let text = (<HTMLInputElement>document.querySelector('#recipeInput')).value;
    getRecipe(text).then((data) => showResult(data))
        .catch((error) => console.log(error.message));
}

// ? ---------------- Show recipe ------------------ //

function showResult(data: any) {
    let array = data.results;
    array.forEach((recipe: any, index: any) => {
        setTimeout(() => {
            createCard(recipe);
        }, index * 500);
    });
}

function createCard(recipe: any) {
    let div = <HTMLDivElement>document.createElement('div');
    cardClasses.forEach((classe) => {
        div.classList.add(classe);
    });
    div.setAttribute('id', recipe.id);

    let p = document.createElement('p');
    p.textContent = recipe.title;
    paraphCardClasses.forEach((classe) => {
        p.classList.add(classe);
    });

    div.append(p);
    let name = recipe.title.split(' ').join('%20');

    getImage(name).then((data) => createImageCard(div, data))
        .catch((error) => errorImage(error.message));
}

function createImageCard(div: HTMLDivElement, name: any) {
    let img = document.createElement('img');
    imgCardClasses.forEach((element) => {
        img.classList.add(element);
    });
    img.src = name.response.images[1].image.url;
    div.prepend(img);
    (<HTMLDivElement>document.querySelector('#recipesList')).append(div);
}

function errorImage(bite: string) {
    console.log(bite);
    console.log('smpfelk');
}

(<HTMLButtonElement>document.querySelector('#search')).addEventListener('click', () => {
    search();
});

(<HTMLInputElement>document.querySelector('#recipeInput')).addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search();
    }
});
