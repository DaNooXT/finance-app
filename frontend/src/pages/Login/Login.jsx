import { useState } from "react";
import { login } from "../../Service/authService"

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleLogin (event) {
        event.preventDefault(); 
        const data = await login(email, password);
        console.log(data);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-card">
                <h2>Login</h2>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Entrar
                </button>
            </form>
        </div>
    )
}

export default Login;