import { Route, Routes } from 'react-router-dom';
import CreatePoll from '../view/CreatePoll/CreatePoll';
import PollContainer from '../view/pollContainer/PollContainer';
import LoginView from '../view/authorization/login-view/login-view';
import RegisterView from '../view/authorization/register-view/register-view';
import NotFound from '../view/404/404';
import NotificationsView from '../view/notifications/NotificationsView';
import Invite from '../view/invite/Invite';
import PollSummary from '../view/PollSummary/PollSummary';
import Logout from '../components/Logout/Logout';
import ProtectedRoute from './ProtectedRoute';

const CustomRoutes = () => 
    <Routes>
        <Route path="pollcreate" element={<ProtectedRoute> <CreatePoll /></ProtectedRoute>}/>
        <Route path="poll" element={<ProtectedRoute> <PollContainer /></ProtectedRoute>}/>  
        <Route path='login' element={<LoginView />}/> 
        <Route path='register' element={<RegisterView />}/>
        <Route path='*' element = {<NotFound/>}/>  
        <Route path="notifications" element={<ProtectedRoute> <NotificationsView /></ProtectedRoute>}/>
        <Route path="invite" element={<ProtectedRoute> <Invite/></ProtectedRoute>}/>
        <Route path="summary" element={<ProtectedRoute> <PollSummary /></ProtectedRoute>}/>
        <Route path='logout' element = {<Logout/>}/>
    </Routes>
;

export default CustomRoutes;