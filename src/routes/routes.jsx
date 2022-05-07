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
import MyPolls from '../view/myPolls/MyPolls';
import Home from '../view/home/home';
import ConfirmEmail from '../components/ConfirmEmail/ConfirmEmail';
import AddModerators from '../components/addModerators/addModerators';

const CustomRoutes = () => 
    <Routes>
        <Route path="pollcreate" element={ <CreatePoll />}/>
        <Route path="poll/:id" element={<PollContainer />}/>  
        <Route path='login' element={<LoginView />}/> 
        <Route path='register' element={<RegisterView />}/>
        <Route path='*' element = {<NotFound/>}/>  
        <Route path="notifications" element={<ProtectedRoute> <NotificationsView /></ProtectedRoute>}/>
        <Route path="invite/:id" element={<ProtectedRoute> <Invite/></ProtectedRoute>}/>
        <Route path="summary/:id" element={<PollSummary />}/>
        <Route path="myPolls" element={<ProtectedRoute> <MyPolls /></ProtectedRoute>}/>
        <Route path="/" element={<Home />}/>
        <Route path='logout' element = {<Logout/>}/>
        <Route path='ConfirmEmail/:id/:token' element = {<ConfirmEmail/>}/>
        <Route path="AddModerators/:id" element={<ProtectedRoute> <AddModerators /></ProtectedRoute>}/>
    </Routes>
;

export default CustomRoutes;