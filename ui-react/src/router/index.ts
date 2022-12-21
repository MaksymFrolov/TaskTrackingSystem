import AddPosition from "../pages/AddPosition"
import AddProject from "../pages/AddProject"
import AddRole from "../pages/AddRole"
import AddStatus from "../pages/AddStatus"
import AddTask from "../pages/AddTask"
import AddUserProject from "../pages/AddUserProject"
import Home from "../pages/Home"
import Login from "../pages/Login"
import NotFoundPage from "../pages/NotFoundPage"
import Position from "../pages/Position"
import Positions from "../pages/Positions"
import Project from "../pages/Project"
import Projects from "../pages/Projects"
import Registration from "../pages/Registration"
import Role from "../pages/Role"
import Roles from "../pages/Roles"
import Status from "../pages/Status"
import Statuses from "../pages/Statuses"
import Task from "../pages/Task"
import Tasks from "../pages/Tasks"
import UpdatePosition from "../pages/UpdatePosition"
import UpdateProject from "../pages/UpdateProject"
import UpdateRole from "../pages/UpdateRole"
import UpdateStatus from "../pages/UpdateStatus"
import UpdateStatusForProjectOrTask from "../pages/UpdateStatusFfpot"
import UpdateTask from "../pages/UpdateTask"
import UpdateUser from "../pages/UpdateUser"
import UpdateUserProject from "../pages/UpdateUserProject"
import User from "../pages/User"
import UserProject from "../pages/UserProject"
import UserProjects from "../pages/UserProjects"
import Users from "../pages/Users"

export interface IRoute {
    path: string
    element: React.ComponentType
}

export enum RouteNames {
    ERROR_PAGE="error",
    LOGIN = "login",
    HOME = "",
    PROJECT = "projects/:id",
    PROJECTS = "projects",
    MY_PROJECTS = "user/projects/:id",
    MY_POSITIONS = "user/positions/:id",
    UPDATE_PROJECT="update/projects/:id",
    ADD_PROJECT="add/project",
    TASK="tasks/:id",
    TASKS=":name/tasks/:id",
    ADD_TASK="add/task/:id",
    UPDATE_TASK="update/task/:id",
    STATUS="statuses/:id",
    STATUSES=":name/statuses",
    UPDATE_STATUS_FOR_PROJECT_OR_TASK=":name/:id/update/status",
    ADD_STATUS="add/status/:name",
    UPDATE_STATUS="update/status/:id",
    USER_PROJECT="user/project/:id",
    USER_PROJECTS="user/projects/:id",
    ADD_USER_PROJECT="add/user/project/:id",
    UPDATE_USER_PROJECT="update/user/project/:id",
    POSITION="positions/:id",
    POSITIONS="positions",
    ADD_POSITION="add/position",
    UPDATE_POSITION="update/position/:id",
    USER = "users/:id",
    USERS = "users",
    REGISTRATION = "registration",
    UPDATE_USER = "update/user/:id",
    ROLE="roles/:id",
    ROLES="roles",
    ADD_ROLE="add/role",
    UPDATE_ROLE="update/role/:id"
}

export const anonRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: Login },
    { path: RouteNames.REGISTRATION, element: Registration },
    { path: RouteNames.ERROR_PAGE, element: NotFoundPage },
]

export const commonRoutes: IRoute[] = [
    { path: RouteNames.USER, element: User },
    { path: RouteNames.UPDATE_USER, element: UpdateUser },
    { path: RouteNames.ROLE, element: Role },
    { path: RouteNames.ROLES, element: Roles },
    { path: RouteNames.HOME, element: Home },
    { path: RouteNames.ERROR_PAGE, element: NotFoundPage },
]

export const adminRoutes: IRoute[]=[
    ...commonRoutes,
    { path: RouteNames.ADD_ROLE, element: AddRole },
    { path: RouteNames.UPDATE_ROLE, element: UpdateRole },
    { path: RouteNames.USERS, element: Users },
    { path: RouteNames.REGISTRATION, element: Registration },
]

export const userManagerCommonRoutes: IRoute[]=[
    ...commonRoutes,
    { path: RouteNames.MY_PROJECTS, element: Projects },
    { path: RouteNames.MY_POSITIONS, element: Positions },
    { path: RouteNames.TASKS, element: Tasks },
    { path: RouteNames.PROJECT, element: Project },
    { path: RouteNames.TASK, element: Task },
    { path: RouteNames.POSITION, element: Position },
]

export const managerRoutes: IRoute[]=[
    ...userManagerCommonRoutes,
    { path: RouteNames.POSITIONS, element: Positions },
    { path: RouteNames.PROJECTS, element: Projects },
    { path: RouteNames.ADD_PROJECT, element: AddProject },
    { path: RouteNames.UPDATE_PROJECT, element: UpdateProject },
    { path: RouteNames.ADD_TASK, element: AddTask },
    { path: RouteNames.UPDATE_TASK, element: UpdateTask },
    { path: RouteNames.ADD_POSITION, element: AddPosition },
    { path: RouteNames.UPDATE_POSITION, element: UpdatePosition },
    { path: RouteNames.STATUS, element: Status },
    { path: RouteNames.STATUSES, element: Statuses },
    { path: RouteNames.ADD_STATUS, element: AddStatus },
    { path: RouteNames.UPDATE_STATUS, element: UpdateStatus },
    { path: RouteNames.USER_PROJECT, element: UserProject },
    { path: RouteNames.USER_PROJECTS, element: UserProjects },
    { path: RouteNames.ADD_USER_PROJECT, element: AddUserProject },
    { path: RouteNames.UPDATE_USER_PROJECT, element: UpdateUserProject },
    { path: RouteNames.UPDATE_STATUS_FOR_PROJECT_OR_TASK, element: UpdateStatusForProjectOrTask },
]