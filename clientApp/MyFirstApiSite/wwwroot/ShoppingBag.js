
const removeFromBasket = (obj) => {
   
    let basket = JSON.parse(sessionStorage.getItem("basket"));
    basket.forEach(item => {
        if (item.product.productId == obj.product.productId)
            if (item.quantity > 1)
                item.quantity -= 1
            else basket = basket.filter((item) => item.product.productId != obj.product.productId)
    });
    sessionStorage.setItem("basket", JSON.stringify(basket))
    document.getElementById("bodyOfTable").replaceChildren()
    drawBasket()

}

const drawBasket = () => {
        let basket = JSON.parse(sessionStorage.getItem("basket"));
        const template = document.getElementById('temp-row');
        const sum = document.getElementById("totalAmount")
    var tmp = 0
    let counter = 0
    basket.forEach(obj => {
            tmp += (obj.product.price * obj.quantity)
            const row = template.content.cloneNode(true);
            counter += obj.quantity
            row.querySelector('.image').style.backgroundImage = `url('${obj.product.imageUrl}')`;
            row.querySelector('.itemName').textContent = obj.product.productName;
            row.querySelector('.itemNumber').textContent = obj.product.productNumber;
            row.querySelector('.price').textContent = (obj.product.price * obj.quantity).toFixed(2);
            row.querySelector('.amount').textContent = obj.quantity;
            row.querySelector('.DeleteButton').addEventListener("click", () => { removeFromBasket(obj) })
            document.getElementById("bodyOfTable").appendChild(row);
    });
 
    const amount = document.getElementById("itemCount")
    amount.innerHTML = counter


    sum.innerHTML=tmp.toFixed(2)
}


const placeOrder = async () => {

    let basket = JSON.parse(sessionStorage.getItem("basket"));

    var newArray = []

    basket.forEach((obj) => {
        newArray.push({ productId: obj.product.productId, quantity: obj.quantity })
    })

    const data = {
        OrderDate: new Date(),
        OrderSum: parseFloat( document.getElementById("totalAmount").innerHTML),
        UserId: JSON.parse(sessionStorage.getItem("user")).userId,
        OrderItems: newArray
    }

        const response = await fetch('api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    if (response.ok) {
        alert("קניה בוצעה בהצלחה")
        sessionStorage.removeItem("basket")
        window.location.href = "Products.html"
    }
    else {
        alert("אין לשנות את המחיר!!!!")

    }

    }

    window.addEventListener("load", () => {
        drawBasket()
    });
