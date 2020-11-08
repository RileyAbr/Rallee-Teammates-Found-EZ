import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Message from "./components/Message";

const routes = [
    { path: "/login", component: Login },
    { path: "/signup", component: SignUp },
    { path: "/profile", component: Profile },
    { path: "/message", component: Message },
    { path: "/", component: Home, exact: true }
];

export default routes;
