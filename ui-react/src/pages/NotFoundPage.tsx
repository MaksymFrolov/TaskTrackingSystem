import { FC } from "react"
import { Button } from "react-bootstrap"
import Card from "react-bootstrap/esm/Card"
import Stack from "react-bootstrap/esm/Stack"
import { useNavigate } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { RouteNames } from "../router"


const NotFoundPage: FC = () => {
    const navigate = useNavigate()
    const { isAuth, roles } = useTypedSelector(state => state.auth)
    const submit=()=>{
        if(isAuth){
            navigate(RouteNames.HOME)
        }
        else{
            navigate(RouteNames.LOGIN)
        }
    }
    return (
        <Stack className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Card className="p-5">
                <p>
                    This page is not available
                </p>
                <Button onClick={()=>submit()}>
                    Go Back
                </Button>
            </Card>
        </Stack>
    )
}

export default NotFoundPage