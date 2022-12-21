import { FC, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import InputGroup from "react-bootstrap/esm/InputGroup"
import { useNavigate } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { RouteNames } from "../router"
import { AuthActionCreators } from "../store/reduce/auth/action-creators"


const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const [username, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useActions(AuthActionCreators)
  const submit = (event: any) => {

    event.preventDefault();
    event.stopPropagation();

    login(username, password)
  }
  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email" isInvalid={error?.email?.length > 0} onChange={e => setLogin(e.target.value)} />
        <Form.Control.Feedback type="invalid">
          {error.email?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" isInvalid={error.password?.length > 0} onChange={e => setPassword(e.target.value)} />
        <Form.Control.Feedback type='invalid'>
          {error.password?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <a href={RouteNames.REGISTRATION} style={{marginLeft:15}}>Registration</a>
    </Form>
  )
}

export default LoginForm