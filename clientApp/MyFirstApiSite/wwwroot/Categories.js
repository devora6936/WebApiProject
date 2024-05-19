var arr = [];

var categories = [];

const hadleChange = (event) => {
    if (event.currentTarget.checked) {
        categories.push(event.target.id)
    }
    else {
        categories = categories.filter(item => item !== event.target.id);
    }
    filterProducts()
}

const filterProducts = ()=>{
    const minPrice = document.getElementById('minPrice').value
    const maxPrice = document.getElementById('maxPrice').value
    const desc = document.getElementById('nameSearch').value
    let categoriesStr = ''
    categories.forEach((id) => { categoriesStr += `&categoryIds=${id}`})
    let url = `api/products?minPrice=${minPrice}&maxPrice=${maxPrice}${categoriesStr}&desc=${desc}`;
    console.log(url)
    document.getElementById("PoductList").replaceChildren();
    importProducts(url)
}

const drawCategories = (data) => {
    console.log(data);
    let categories = document.getElementById("temp-category");

    data.forEach(category => {
        const card = categories.content.cloneNode(true);
        card.querySelector('.cb.checkbox');
        card.querySelector('.opt').setAttribute("id", category.categoryId);
        card.querySelector('label .OptionName').textContent = category.categoryName;
        card.querySelector('.opt').addEventListener("click", hadleChange)

        document.getElementById("categoryList").appendChild(card);
    });
}


 const importCategories = async () => {
    const response = await fetch(
        'api/categories'
    )

    if (!response.ok) {
        return [];
    }

    const data = await response.json();
    arr = data;
    drawCategories(data)
}

window.addEventListener("load", importCategories);
