import Auth from "../pages/Auth.jsx";
import MainPage from "../pages/MainPage.jsx";
import NotFound404 from "../pages/NotFound404.jsx";

const privateRoutes = [
    {path: "/", component: MainPage, exact: false},
]

const publicRoutes = [
    {path: "/auth/login", component: Auth, exact: false},
    {path: "*", component: NotFound404, exact: false},
]
privateRoutes.forEach(
    (route) =>
        route.public = false
)
publicRoutes.forEach(route => route.public = true);
export const userRoutes = privateRoutes.concat(publicRoutes);
