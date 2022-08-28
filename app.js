const app_id = "e95074c5"
const app_key = "40da165683bc54f45d0e3ffa9834cf4a"
const button = document.querySelector("#search")
const input = document.querySelector("#type")
const loader = document.querySelector("div.loader")
const recipeList = document.querySelector('.cards')
const gif = document.querySelector('#scroller')



// function to show/remove the animation

const animation = (astate) => {
    gif.style = `display: ${astate == true ? 'block' : "none"}`
}

animation(true)



// function to show/remove the loader

const loading = (state) => {
    loader.style = `display: ${state == true ? 'block' : "none"}`
}

loading(false)


const getRecipe = async (query) => {

    try {

        loading(true)
        animation(false)
        const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;

        const response = await fetch(endpoint)
        const { hits } = await response.json()

        if (hits.length === 0) window.alert("No recipe found, SearchBox is Empty 👨‍🍳"); { animation(true) }
        // console.log(hits)

        // hits.map(hits => {
        //     console.log(hits.recipe)
        // })


        hits.map(({ recipe }) => {
            console.log(recipe)


            const { image, calories, label, url, yield, ingredientLines } = recipe
            const ele = document.createElement('li')
            ele.classList.add('cards_item')


            ele.innerHTML = `
        <div class="card">
            <div class="card_image"><img src=${image} alt="mixed vegetable salad in a mason jar. " /></div>
            <div class="card_content">
                <h4 class="card_title">${label} <span class="orange">${calories.toFixed(0)} kcal</span></h4>
                <br>

                <h4>Serving : </h4>${yield} people

<br><br>
                <h3>Ingredients : </h3> 
                <li> ${ingredientLines}</li>

                <button class="card_btn orange"><a target="_blank" href=${url} >See more </a></button>
            </div>
        </div>
    `

            recipeList.appendChild(ele)

        })

        loading(false)

    } catch (error) {
        console.log(error)
        loading(false)
        animation(true)
    }

};


const searchRecipie = () => {

    // remove the previous results
    recipeList.innerHTML = null

    const query = input.value
    getRecipe(query);


};

button.addEventListener('click', searchRecipie)

input.addEventListener('keydown', e => e.key === 'Enter' ? searchRecipie() : null)










