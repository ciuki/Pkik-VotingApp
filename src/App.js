import './App.css';
import './scssConfig/style.css'
import PollContainer from './view/pollContainer/PollContainer';
import NavBar from './components/NavBar/NavBar';
import CreatePoll from './components/CreatePoll/CreatePoll';
import QuestionBoard from './components/QuestionBoard/QuestionBoard';


function App() {
  return (
    <div>
    <NavBar/>
    <CreatePoll/>
    </div>
  );
}

export default App;
