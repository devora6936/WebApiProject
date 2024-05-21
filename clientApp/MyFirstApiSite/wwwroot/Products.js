var arr =[];




const addToCart = (product) => {
    
    let basket = JSON.parse(sessionStorage.getItem("basket"))
    if (!basket) {
        sessionStorage.setItem("basket", JSON.stringify([{ product: product, quantity: 1 }]))
        document.getElementById("ItemsCountText").innerHTML = 1
    }
    else {
        let counter = 0;
        basket.forEach(obj => { counter += obj.quantity })
        const ind = basket.findIndex(p => p.product.productId == product.productId)
        if (ind == -1) {
            const tmp = [...basket, { product: product, quantity: 1 }]
            sessionStorage.setItem("basket", JSON.stringify(tmp));
            const count = document.getElementById("ItemsCountText")
            count.innerHTML = counter + 1;
        }
        else {
            const count = document.getElementById("ItemsCountText");
            count.innerHTML = Number(count.innerHTML) + 1;
            basket[ind].quantity += 1;
            sessionStorage.setItem("basket", JSON.stringify(basket));
        }

    }


}

 const drawProducts = (data) => {
    let poductList = document.getElementById("temp-card")

     data.forEach(product => {

        const card = poductList.content.cloneNode(true);
        card.querySelector('.card').setAttribute("id",product.productId)
        card.querySelector('h1').textContent = product.productName;
        card.querySelector('.price').textContent = product.price;
        //card.querySelector('.description').textContent = product.description;
        card.querySelector('img').src = product.imageUrl;
         card.querySelector('button').addEventListener("click", () => { addToCart(product) })
        
        document.getElementById("PoductList").appendChild(card);
     });


}



const importProducts = async (url) => {
    if (url == undefined) {
        url = 'api/products'
    }
    const response = await fetch(
       url, {
            method: 'GET',
            headers: {
                'Content-Type' : "application/json"
            }
        }
    )

    if (!response.ok) {
        return [];
    }

    const data = await response.json();
    arr = data;
    drawProducts(data)

    if (url == 'api/products') {
        var min = 100000;
        var max = 0;
        data.forEach(product => {
            if (product.price > max)
                max = product.price
            if (product.price < min)
                min = product.price
        });
        document.getElementById("minPrice").value = min
        document.getElementById("maxPrice").value = max
    }
        
}

window.addEventListener("load", () => {
    const range=importProducts(undefined)
    let basket = sessionStorage.getItem("basket")
    const count = document.getElementById("ItemsCountText")
    let counter = 0;
    if (basket) {
        basket.forEach(obj => { counter += obj.quantity })
        count.innerHTML = counter
    } 
});
