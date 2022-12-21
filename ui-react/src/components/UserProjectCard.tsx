import { FC } from "react"
import Button from "react-bootstrap/esm/Button"
import Card from "react-bootstrap/esm/Card"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IUserProject } from "../models/IUserProject"
import { UserProjectActionCreators } from "../store/reduce/userproject/action-creators"


interface UserProjectCardProps {
    userProject: IUserProject
}

const UserProjectCard: FC<UserProjectCardProps> = ({ userProject }) => {
    const { deleteUserProject } = useActions(UserProjectActionCreators)
    const { isAuth, roles } = useTypedSelector(state => state.auth)
    const submit = () => {
        deleteUserProject( userProject.id)
    }
    return (
        <Card
            style={{ width: 600, marginRight: 15, marginLeft: 15 }}
        >
            <Card.Body>
                <Card.Title>{userProject.id}</Card.Title>
                <p>
                    User: {
                        userProject.userName
                    }
                </p>
                <p>
                    Position: {
                        userProject.positionName
                    }
                </p>
                <p>
                    Task: {
                        userProject.taskName
                    }
                </p>
                {
                    roles.find(t => t.name == "Manager")
                    &&
                    <Button onClick={() => submit()}>
                        Delete
                    </Button>
                }
            </Card.Body>
        </Card>
    )
}

export default UserProjectCard