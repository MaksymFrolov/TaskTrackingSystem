import { FC } from "react"
import Container from "react-bootstrap/esm/Container"
import Nav from "react-bootstrap/esm/Nav"
import Navbar from "react-bootstrap/esm/Navbar"
import NavDropdown from "react-bootstrap/esm/NavDropdown"
import { useNavigate } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { RouteNames } from "../router"
import { AuthActionCreators } from "../store/reduce/auth/action-creators"


const Header: FC = () => {
  const navigate = useNavigate()
  const { isAuth, user, roles } = useTypedSelector(state => state.auth)
  const { logout } = useActions(AuthActionCreators)
  return (
    <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate(RouteNames.HOME)}>Task Tracking Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {
              roles.find(t => t.name == "User")
              &&
              <>
                <Nav.Link onClick={() => navigate(`/user/projects/${localStorage.getItem('id')}`)}>My Projects</Nav.Link>
                <Nav.Link onClick={() => navigate(`/user/tasks/${localStorage.getItem('id')}`)}>My Tasks</Nav.Link>
                <Nav.Link onClick={() => navigate(`user/positions/${localStorage.getItem('id')}`)}>My Positions</Nav.Link>
              </>
            }
            {
              roles.find(t => t.name == "Administrator")
              &&
              <>
                <NavDropdown title="User Menu" id="collasible-nav-dropdown-admin-user">
                  <NavDropdown.Item onClick={() => navigate(RouteNames.USERS)}>
                    All Users
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(RouteNames.REGISTRATION)}>
                    Add User
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Role Menu" id="collasible-nav-dropdown-admin-role">
                  <NavDropdown.Item onClick={() => navigate(RouteNames.ROLES)}>
                    All Roles
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(RouteNames.ADD_ROLE)}>
                    Add Role
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            }
            {
              roles.find(t => t.name == "Manager")
              &&
              <>
                <NavDropdown title="Project Menu" id="collasible-nav-dropdown-manager-project">
                  <NavDropdown.Item onClick={() => navigate(RouteNames.PROJECTS)}>
                    All Projects
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(RouteNames.ADD_PROJECT)}>
                    Add Project
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate(`project/statuses`)}>
                    All Project Statuses
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(`add/status/project`)}>
                    Add Project Status
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Task Menu" id="collasible-nav-dropdown-manager-task">
                  <NavDropdown.Item onClick={() => navigate(RouteNames.TASKS)}>
                    All Tasks
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate(`task/statuses`)}>
                    All Task Statuses
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(`add/status/task`)}>
                    Add Task Status
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate(RouteNames.POSITIONS)}>
                    All Postitions
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(RouteNames.ADD_POSITION)}>
                    Add Postition
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            }
          </Nav>
          <Nav>
            <NavDropdown title={user.email} id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate(`/users/${localStorage.getItem('id')}`)}>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate(RouteNames.ROLES)}>
                My Roles
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => logout()}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header