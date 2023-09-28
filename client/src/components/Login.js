import React, {useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login({onLogin}) {
    const [loginClicked, setLoginClicked] = useState(false)
    const [signupClicked, setSignupClicked] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const history = useHistory()

    function handleLoginSubmit(e) {
        e.preventDefault()
        fetch("http://127.0.0.1:5555/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({email, password})
        })
        .then(r => {
            if (r.ok) {
                r.json().then(user => onLogin(user))
                setEmail("")
                setPassword("")
                history.push('/')
            } else {
                console.log("error")
            }
        })
    }

    function handleSignupSubmit(e) {
        e.preventDefault()
        fetch("http://127.0.0.1:5555/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({name, email, password})
        })
        .then(r => {
            if (r.ok) {
                r.json().then(user => onLogin(user))
                setName("")
                setEmail("")
                setPassword("")
                history.push('/')
            } else {
                console.log("error")
            }
        })
    }
    
    return (
        <div id="login-container">
            <img id="login-image" src="def_repr.png" alt="Def Repr Logo"/>
            <p id="login-description">An online publishing platform for developers, by developers.</p>
            <div id="login-buttons">
                {loginClicked ?
                    <form id="login-form" onSubmit={handleLoginSubmit}>
                        <input className="login-input-field" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input className="login-input-field" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button id="login-form-button" type="submit">Login</button>
                    </form>
                : <button id="login-button" onClick={() => setLoginClicked(!loginClicked)}>Log In</button>
                }
                {signupClicked
                ?
                    <form id="signup-form" onSubmit={handleSignupSubmit}>
                        <input className="signup-input-field" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input className="signup-input-field" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input className="signup-input-field" type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button id="signup-form-button" type="submit">Sign Up</button>
                    </form>
                : <button id="signup-button" onClick={() => setSignupClicked(!signupClicked)}>Sign Up</button>
                }
            </div>
        </div>
    )
}

export default Login;