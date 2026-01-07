import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import Dashboard from "./components/Dashboard.js"
import Update from "./components/Update.js"
import Admin from "./components/Admin.js"

const routes=[
    {path:"/",component:Home},
    {path:"/login",component:Login},
    {path:"/register",component:Register},
    {path:"/dashboard",component:Dashboard},
    {path:"/update/:id",component:Update,name:'update' },
    {path:"/admin",component:Admin}
]

const router = new VueRouter({
    routes
})

const app =new Vue({
    el:"#app",
    router,
    template:
    `<div class="container">
         <nav-bar></nav-bar>
         <router-view></router-view>
         <foot></foot>
    </div>`,
    data:{
        section:"frontend"
    },
    components:{
        "nav-bar":Navbar,
        "foot":Footer
    }
})