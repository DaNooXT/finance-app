export async function login (email, password) {
    const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = response.json();

    return data
}

export async function register (name, email, password) {
    const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    const data = await response.json();

    return data 
}