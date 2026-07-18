import { useState } from "react";
import { register } from "../../Service/authService";

function Register () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister (event) {
        event.preventDefault();
        const data = await register(name, email, password);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="name"></label>
                    <input type="text" 
                        id="name" 
                        placeholder="Type your name here"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email"></label>
                    <input type="email" 
                        id="email" 
                        placeholder="Type your email here"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password"></label>
                    <input type="password" 
                        id="password" 
                        placeholder="Type your Password here"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Send
                </button>
            </form>
        </div>
    )
};
export default Register;