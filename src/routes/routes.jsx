import { Route, Routes } from 'react-router-dom';
import CreatePoll from '../view/CreatePoll/CreatePoll';
import PollContainer from '../view/pollContainer/PollContainer';
import LoginView from '../view/authorization/login-view/login-view';
import RegisterView from '../view/authorization/register-view/register-view';
import NotFound from '../view/404/404';
import NotificationsView from '../view/notifications/NotificationsView';


const CustomRoutes = () => 
    <Routes>
        <Route path='pollcreate' element={<CreatePoll/>}/>
        <Route path='poll' element={<PollContainer/>}/>  
        <Route path='login' element={<LoginView />}/> 
        <Route path='register' element={<RegisterView />}/>
        <Route path='*' element = {<NotFound/>}/>  
        <Route path='notifications' element = {<NotificationsView/>}/>
    </Routes>
;

export default CustomRoutes;