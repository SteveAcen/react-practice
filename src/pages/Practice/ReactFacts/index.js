import React,{useState} from "react"
import './index.scss'

function Navbar() {
    const [darkMode,setDarkMode] = React.useState(false)
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className="container">
            {/* 导航 */}
            <nav className={darkMode ? "dark" : ""}>
                <h3 className="nav--logo_text">ReactFacts</h3>
                <div className="toggler">
                    <p className="toggler--light">Light</p>
                    <div
                        className="toggler--slider"
                        onClick={toggleDarkMode}
                    >
                        <div className="toggler--slider--circle"></div>
                    </div>
                    <p className="toggler--dark">Dark</p>
                </div>
            </nav>
            {/* 内容 */}
            <main className={darkMode ? "dark" : ""}>
                <h1 className="main--title">Fun facts about React</h1>
                <ul className="main--facts">
                    <li>Was first released in 2013</li>
                    <li>Was originally created by Jordan Walke</li>
                    <li>Has well over 100K stars on GitHub</li>
                    <li>Is maintained by Facebook</li>
                    <li>Powers thousands of enterprise apps, including mobile apps</li>
                </ul>
            </main>
        </div>
    )
}

const title = "ReactFacts"
const summary  = `你好，我是ReactFacts，我的学习经验是`

export default {
    "component": Navbar,
    title,
    summary
}