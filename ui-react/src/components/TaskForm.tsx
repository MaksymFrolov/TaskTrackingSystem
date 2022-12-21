import { FC, useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { useParams } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ITask } from "../models/ITask"
import { GetStatusesEnum, StatusesActionCreators } from "../store/reduce/statuses/action-creators"
import { TaskActionCreators } from "../store/reduce/task/action-creators"



const TaskForm: FC= () => {
    const { taskError } = useTypedSelector(t => t.task)
    const [name, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [statusId, setStatusId] = useState('')
    const { addTask } = useActions(TaskActionCreators)
    const { loadStatuses } = useActions(StatusesActionCreators)
    const { statuses } = useTypedSelector(t => t.statuses)
    const param = useParams()
    const submit = (event: any) => {
      
      event.preventDefault();
      event.stopPropagation();

      addTask({name, description, startDate: new Date(Date.now()), expiryDate: new Date(expiryDate), statusId: Number(statusId), projectId: Number(param.id), managerId: Number(localStorage.getItem('id'))} as ITask)

    }
    useEffect(() => {
        loadStatuses(GetStatusesEnum.BY_TASK)
      }, [])
    return (
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" isInvalid={taskError?.name?.length > 0} onChange={e => setTask(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            {taskError.name?.map(t => <p key={t}>{t}</p>)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Description" isInvalid={taskError?.description?.length > 0} onChange={e => setDescription(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            {taskError.description?.map(t => <p key={t}>{t}</p>)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDate">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control type="date" isInvalid={taskError.expiryDate?.length > 0} onChange={e => setExpiryDate(e.target.value)} />
          <Form.Control.Feedback type='invalid'>
            {taskError.expiryDate?.map(t => <p key={t}>{t}</p>)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={statuses[0]?.id} onChange={e => setStatusId(e.target.value)}>
              {
                statuses?.map(t=>
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
  
  export default TaskForm