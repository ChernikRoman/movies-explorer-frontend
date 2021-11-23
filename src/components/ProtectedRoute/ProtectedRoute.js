import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function ProtectedRoute({children, loggedIn, isLoaded}) {
    // дожидаемся пока пропс loggedIn и isLoaded будут true, иначе показываем прелоадер или перенаправляем на главную страницу
    function loading() {
        if (loggedIn && isLoaded) {
            return children
        } else if (!isLoaded) {
            return <Preloader />
        } else {
            return <Navigate to='/' />
        }
    }

    return loading()
}

export default ProtectedRoute