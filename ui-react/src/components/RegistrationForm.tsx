import { FC, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IRegisterUser } from "../models/IRegisterUser"
import { AuthActionCreators } from "../store/reduce/auth/action-creators"
import { RolesActionCreators } from "../store/reduce/roles/action-creators"
import { UserActionCreators } from "../store/reduce/user/action-creators"


const RegistrationForm: FC = () => {
  const { registerError } = useTypedSelector(t => t.user)
  const { isAuth } = useTypedSelector(t => t.auth)
  const [email, setLogin] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { login } = useActions(AuthActionCreators)
  const { addUser } = useActions(UserActionCreators)
  const { loadRoles } = useActions(RolesActionCreators)
  const { roles } = useTypedSelector(t => t.roles)
  const submit = async (event: any) => {
    
    event.preventDefault();
    event.stopPropagation();
    await addUser({ email, userName, password, confirmPassword, firstName, lastName } as IRegisterUser)

    if (!isAuth) {
      await login(email, password)
    }
  }
  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email" isInvalid={registerError?.email?.length > 0} onChange={e => setLogin(e.target.value)} />
        <Form.Control.Feedback type="invalid">
          {registerError.email?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" isInvalid={registerError?.userName?.length > 0} onChange={e => setUserName(e.target.value)} />
        <Form.Control.Feedback type="invalid">
          {registerError.userName?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" isInvalid={registerError.password?.length > 0} onChange={e => setPassword(e.target.value)} />
        <Form.Control.Feedback type='invalid'>
          {registerError.password?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" isInvalid={registerError.confirmPassword?.length > 0} onChange={e => setConfirmPassword(e.target.value)} />
        <Form.Control.Feedback type='invalid'>
          {registerError.confirmPassword?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupFirstName">
        <Form.Label>Firstname</Form.Label>
        <Form.Control type="text" placeholder="Firstname" isInvalid={registerError?.firstName?.length > 0} onChange={e => setFirstName(e.target.value)} />
        <Form.Control.Feedback type="invalid">
          {registerError.firstName?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupLastName">
        <Form.Label>Lastname</Form.Label>
        <Form.Control type="text" placeholder="Lastname" isInvalid={registerError?.lastName?.length > 0} onChange={e => setLastName(e.target.value)} />
        <Form.Control.Feedback type="invalid">
          {registerError.lastName?.map(t => <p key={t}>{t}</p>)}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default RegistrationForm