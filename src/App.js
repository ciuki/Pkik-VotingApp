import './App.css';
import './scssConfig/style.css'
import PollContainer from './view/pollContainer/PollContainer';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <div>
    <NavBar/>
    <PollContainer/>
    </div>
  );
}

export default App;
