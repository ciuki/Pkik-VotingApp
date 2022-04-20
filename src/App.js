import './App.css';
import './scssConfig/style.css'
import NavBar from './components/NavBar/NavBar';
import CreatePoll from './components/CreatePoll/CreatePoll';
import PollContainer from './view/pollContainer/PollContainer';
import RegisterView from './view/authorization/register-view/register-view';
import LoginView from './view/authorization/login-view/login-view';


function App() {
  return (
      <div className='area'>
        <NavBar />
        <PollContainer/>
        <ul class="circles">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
          </ul>
      </div>
  );
}

export default App;
