import { Navigate, Route, Routes } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { adminRoutes, anonRoutes, managerRoutes, RouteNames, userManagerCommonRoutes } from "../router"
import Header from "./Header"


const AppRouter = () => {
    const { isAuth, roles } = useTypedSelector(state => state.auth)
    return (
        isAuth
            ?
            <>
                <Header />

                <Routes>
                    {
                        roles.find(t => t.name == "Manager")
                        &&

                        managerRoutes.map(route =>
                            <Route path={route.path}
                                element={<route.element />}
                                key={route.path}
                            />
                        )
                    }
                    {
                        roles.find(t => t.name == "User")
                        &&

                        userManagerCommonRoutes.map(route =>
                            <Route path={route.path}
                                element={<route.element />}
                                key={route.path}
                            />
                        )
                    }
                    {
                        roles.find(t => t.name == "Administrator")
                        &&

                        adminRoutes.map(route =>
                            <Route path={route.path}
                                element={<route.element />}
                                key={route.path}
                            />
                        )
                    }
                    <Route
                        path="*"
                        element={<Navigate to={RouteNames.HOME} replace />}
                    />
                </Routes>
            </>
            :
            <Routes>
                {anonRoutes.map(route =>
                    <Route path={route.path}
                        element={<route.element />}
                        key={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to={RouteNames.LOGIN} replace />}
                />
            </Routes>
    )
}

export default AppRouter