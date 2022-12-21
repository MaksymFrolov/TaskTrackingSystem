import { FC, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { useParams } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IStatus } from "../models/IStatus"
import { StatusActionCreators, StatusEnum } from "../store/reduce/status/action-creators"


const StatusForm: FC = () => {
    const { statusError } = useTypedSelector(t => t.status)
    const [name, setName] = useState('')
    const { addStatus } = useActions(StatusActionCreators)
    const param = useParams()
    const submit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        if (param.name == "task") {
            addStatus(StatusEnum.BY_TASK, { name } as IStatus)
        }
        else {
            addStatus(StatusEnum.BY_PROJECT, { name } as IStatus)
        }
    }
    return (
        <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Status Name</Form.Label>
                <Form.Control type="text" placeholder="Status Name" isInvalid={statusError?.name?.length > 0} onChange={e => setName(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                    {statusError.name?.map(t => <p key={t}>{t}</p>)}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default StatusForm