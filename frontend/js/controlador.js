//Javascript Stephany

const login = () => {
    const payload = { 
        usuario: document.getElementById('user-input').value,
        password: document.getElementById('user-pass').value
    }
console.log("Login", payload);
}