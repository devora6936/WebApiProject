//const checkPassword = async () => {

//    const password = document.getElementById('regPassword').value

//    const responsePost = await fetch('api/users/checkPassword', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(password)
//    });

//    const res = await responsePost.json();

//    if (!responsePost.ok) {

//    }

//    else {
//        const progress = document.getElementById('progress')
//        progress.value = JSON.stringify(res)
//    }

//}

//const login = async () => {
//    const postData = {
//       email: document.getElementById('email').value,
//       password: document.getElementById('password').value
//    };
//    const responsePost = await fetch('api/users/login', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(postData)
//    });
//    console.log(responsePost);
//    const res = await responsePost.json();

//    if (!responsePost.ok)
//        alert("שם משתמש או סיסמא אינם תקינים");
//    else {
//        sessionStorage.setItem("user", JSON.stringify(res));
//        window.location.href = "homePage.html";
//    }
//};

//const register = async() => {
//    const postData = {
//        Email: document.getElementById('regEmail').value,
//        Password: document.getElementById('regPassword').value,
//        FirstName: document.getElementById('firstName').value,
//        LastName: document.getElementById('lastName').value
//    };

//    const responsePost = await fetch('api/users', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(postData)
//    });

//    const res = await responsePost.json();

//    if (!responsePost.ok)
//        alert("fiels are not valid");
//    else {
//        alert("user added")
//    }

//};

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

const getInputValueById = (id) => document.getElementById(id).value;
const showAlert = (message) => alert(message);

const fetchApi = async (url, method, body) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Error');
        return result;
    } catch (error) {
        console.error(error);
        showAlert(error.message);
        throw error;
    }
}

const checkPassword = async () => {
    const password = getInputValueById('regPassword');
    try {
        const res = await fetchApi('api/users/checkPassword', 'POST', password);
        const progress = document.getElementById('progress');
        progress.value = JSON.stringify(res);
    } catch (error) {
        // Handle specific error if needed
    }
}

const login = async () => {
    const postData = {
        email: getInputValueById('email'),
        password: getInputValueById('password')
    };
    try {
        const res = await fetchApi('api/users/login', 'POST', postData);
        sessionStorage.setItem("user", JSON.stringify(res));
        window.location.href = "homePage.html";
    } catch (error) {
        showAlert("שם משתמש או סיסמא אינם תקינים");
    }
};

const register = async () => {
    const postData = {
        Email: getInputValueById('regEmail'),
        Password: getInputValueById('regPassword'),
        FirstName: getInputValueById('firstName'),
        LastName: getInputValueById('lastName')
    };
    try {
        await fetchApi('api/users', 'POST', postData);
        showAlert("user added");
    } catch (error) {
        showAlert("fields are not valid");
    }
};

//const update = async () => {
//    const putData = {
//        Email: getInputValueById('email'),
//        Password: getInputValueById('password'),
//        FirstName: getInputValueById('firstName'),
//        LastName: getInputValueById('lastName')
//    };
//    try {
//        const user = JSON.parse(sessionStorage.getItem('user'));
//        if (!user || !user.userId) {
//            showAlert('User not found in session');
//            return;
//        }

//        const userId = user.userId;
//        const url = `api/users/${userId}`;

//        const res = await fetchApi(url, 'PUT', putData);
//        showAlert("user updated");
//        console.log('Update response:', res);
//    } catch (error) {
//        showAlert("fields are not valid");
//    }
//};