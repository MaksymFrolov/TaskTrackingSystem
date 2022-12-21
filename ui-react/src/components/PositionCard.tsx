import { FC } from "react"
import { useActions } from "../hooks/useActions"
import Button from "react-bootstrap/esm/Button"
import Card from "react-bootstrap/esm/Card"
import { IPosition } from "../models/IPosition"
import { PositionActionCreators } from "../store/reduce/position/action-creators"
import { useTypedSelector } from "../hooks/useTypedSelector"


interface PositionCardProps {
    position: IPosition
}

const PositionCard: FC<PositionCardProps> = ({ position }) => {
    const { deletePosition } = useActions(PositionActionCreators)
    const { isAuth, roles } = useTypedSelector(state => state.auth)
    const submit = () => {
        deletePosition(position.id)
    }
    return (
        <Card
            style={{ width: 600, marginRight: 15, marginLeft: 15 }}
        >
            <Card.Body>
                <Card.Title>{position.name}</Card.Title>
                <p>
                    {
                        position.description
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

export default PositionCard