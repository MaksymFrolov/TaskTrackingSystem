import { FC, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IPosition } from "../models/IPosition"
import { PositionActionCreators } from "../store/reduce/position/action-creators"


const PositionForm: FC = () => {
    const { positionError } = useTypedSelector(t => t.position)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { addPosition } = useActions(PositionActionCreators)
    const submit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        addPosition({name, description}as IPosition)
    }
    return (
        <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Position Name</Form.Label>
                <Form.Control type="text" placeholder="Position Name" isInvalid={positionError?.name?.length > 0} onChange={e => setName(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                    {positionError.name?.map(t => <p key={t}>{t}</p>)}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description" isInvalid={positionError?.description?.length > 0} onChange={e => setDescription(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                    {positionError.description?.map(t => <p key={t}>{t}</p>)}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default PositionForm