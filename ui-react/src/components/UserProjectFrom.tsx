import { FC, useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { useParams } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IUserProject } from "../models/IUserProject"
import { PositionsActionCreators } from "../store/reduce/positions/actions-creators"
import { TasksActionCreators } from "../store/reduce/tasks/action-creators"
import { UserProjectActionCreators } from "../store/reduce/userproject/action-creators"
import { GetUsersEnum, UsersActionCreators } from "../store/reduce/users/action-creators"


const UserProjectForm: FC = () => {
    const [userId, setUserId] = useState('')
    const [positionId, setPositionId] = useState('')
    const {users} = useTypedSelector(t=>t.users)
    const {positions}=useTypedSelector(t=>t.positions)
    const { addUserProject } = useActions(UserProjectActionCreators)
    const {loadUsers}=useActions(UsersActionCreators)
    const {loadPositions}=useActions(PositionsActionCreators)
    const param = useParams()
    const submit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        addUserProject({userId: Number(userId), positionId:Number(positionId), taskId: Number(param.id), userEmail: users.find(t=>t.id==Number(userId))?.email} as IUserProject)
    }
    useEffect(() => {
        loadUsers(GetUsersEnum.ALL_USER)
        loadPositions()
      }, [])
    return (
        <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formGroupUser">
                <Form.Label>User</Form.Label>
                <Form.Select aria-label="User" defaultValue={users[0]?.id} onChange={e => setUserId(e.target.value)}>
                    {
                        users?.map(t =>
                            <option key={t.id} value={t.id}>{t.userName}</option>
                        )
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPosition">
                <Form.Label>Position</Form.Label>
                <Form.Select aria-label="Position" defaultValue={positions[0]?.id} onChange={e => setPositionId(e.target.value)}>
                    {
                        positions?.map(t =>
                            <option key={t.id} value={t.id}>{t.name}</option>
                        )
                    }
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default UserProjectForm