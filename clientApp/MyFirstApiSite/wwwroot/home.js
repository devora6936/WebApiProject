const checkPassword = async () => {

    const password = document.getElementById('regPassword').value
    
    const responsePost = await fetch('api/users/checkPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
    });

    const res = await responsePost.json();

    if (!responsePost.ok) {
        
    }
        
    else {
        const progress = document.getElementById('progress')
        progress.value = JSON.stringify(res)
    }

}

const login = async () => {
    const postData = {
       email: document.getElementById('email').value,
       password: document.getElementById('password').value
    };
    const responsePost = await fetch('api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    console.log(responsePost);
    const res = await responsePost.json();
  
    if (!responsePost.ok)
        alert("שם משתמש או סיסמא אינם תקינים");
    else {
        sessionStorage.setItem("user", JSON.stringify(res));
        window.location.href = "products.html";
    }
};

const register = async() => {
    const postData = {
        Email: document.getElementById('regEmail').value,
        Password: document.getElementById('regPassword').value,
        FirstName: document.getElementById('firstName').value,
        LastName: document.getElementById('lastName').value
    };

    const responsePost = await fetch('api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    const res = await responsePost.json();

    if (!responsePost.ok)
        alert("fiels are not valid");
    else {
        alert("user added")
    }

};

const update = async () => {
    const putData = {
        Email: document.getElementById('email').value,
        Password: document.getElementById('password').value,
        FirstName: document.getElementById('firstName').value,
        LastName: document.getElementById('lastName').value
       
    };
    const Id = JSON.parse(sessionStorage.getItem('user')).userId

    const responsePut = await fetch('api/users/'+ Id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(putData)
    });

    const res = await responsePut.json();

    if (!responsePut.ok)
        alert("fiels are not valid");
    else
        alert("user update")

};