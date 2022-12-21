import { FC } from "react"
import { useActions } from "../hooks/useActions"
import Button from "react-bootstrap/esm/Button"
import Card from "react-bootstrap/esm/Card"
import { IStatus } from "../models/IStatus"
import { StatusActionCreators } from "../store/reduce/status/action-creators"
import { GetStatusesEnum } from "../store/reduce/statuses/action-creators"
import { useTypedSelector } from "../hooks/useTypedSelector"


interface StatusCardProps {
    status: IStatus,
    name: string
}

const StatusCard: FC<StatusCardProps> = ({ status, name }) => {
    const { deleteStatus } = useActions(StatusActionCreators)
    const { isAuth, roles } = useTypedSelector(state => state.auth)
    const submit = () => {
        if (name == "task") {
            deleteStatus(GetStatusesEnum.BY_TASK, status.id)
        }
        else {
            deleteStatus(GetStatusesEnum.BY_PROJECT, status.id)
        }
    }
    return (
        <Card
            style={{ width: 600, marginRight: 15, marginLeft: 15 }}
        >
            <Card.Body>
                <Card.Title>{status.name}</Card.Title>
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

export default StatusCard