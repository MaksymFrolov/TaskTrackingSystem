import { FC, useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IProject } from "../models/IPoject"
import { ProjectActionCreators } from "../store/reduce/project/action-creators"
import { GetStatusesEnum, StatusesActionCreators } from "../store/reduce/statuses/action-creators"


const ProjectForm: FC = () => {
    const { projectError } = useTypedSelector(t => t.project)
    const [name, setProject] = useState('')
    const [description, setDescription] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [statusId, setStatusId] = useState('')
    const { addProject } = useActions(ProjectActionCreators)
    const { loadStatuses } = useActions(StatusesActionCreators)
    const { statuses } = useTypedSelector(t => t.statuses)
    const submit = (event: any) => {
      
      event.preventDefault();
      event.stopPropagation();

      addProject({name, description, startDate: new Date(Date.now()), expiryDate: new Date(expiryDate), statusId: Number(statusId)} as IProject)

    }
    useEffect(() => {
        loadStatuses(GetStatusesEnum.BY_PROJECT)
      }, [])
    return (
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" isInvalid={projectError?.name?.length > 0} onChange={e => setProject(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            {projectError.name?.map(t => <p key={t}>{t}</p>)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Description" isInvalid={projectError?.description?.length > 0} onChange={e => setDescription(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            {projectError.description?.map(t => <p key={t}>{t}</p>)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDate">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control type="date" isInvalid={projectError.expiryDate?.length > 0} onChange={e => setExpiryDate(e.target.value)} />
          <Form.Control.Feedback type='invalid'>
            {projectError.expiryDate?.map(t => <p key={t}>{t}</p>)}
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
  
  export default ProjectForm