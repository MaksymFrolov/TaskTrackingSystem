import { FC, useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { useParams } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ProjectActionCreators } from "../store/reduce/project/action-creators"
import { GetStatusesEnum, StatusesActionCreators } from "../store/reduce/statuses/action-creators"
import { TaskActionCreators } from "../store/reduce/task/action-creators"


const UpdateStatusFpot: FC= () => {
    const [statusId, setStatusId] = useState('')
    const { updateProject, loadProject} = useActions(ProjectActionCreators)
    const { updateTaskStatus } = useActions(TaskActionCreators)
    const { statuses } = useTypedSelector(t => t.statuses)
    const { project}=useTypedSelector(t=>t.project)
    const { loadStatuses } = useActions(StatusesActionCreators)
    const {task}=useTypedSelector(t=>t.task)
    const param = useParams()
    const submit = (event: any) => {
      
      event.preventDefault();
      event.stopPropagation();

      if(param?.name=="task"){
        updateTaskStatus(Number(param.id),statuses.find(t=>t.id==Number(statusId)))
      }
      else{
        project.statusId=Number(statusId)
        updateProject(project)
      }
    }
    useEffect(() => {
      if(param.name=="task"){
        loadStatuses(GetStatusesEnum.BY_TASK)
      }
      else{
        loadStatuses(GetStatusesEnum.BY_PROJECT)
        loadProject(Number(param.id))
      }
      
    }, [])
    return (
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formGroupStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select aria-label="Default select example" onChange={e => setStatusId(e.target.value)}>
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
  
  export default UpdateStatusFpot