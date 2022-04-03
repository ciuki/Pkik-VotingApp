import logo from './logo.svg';
import './App.css';
import './scssConfig/style.css'
import PollContainer from './view/pollContainer/PollContainer';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <div>
    <NavBar isLoggedIn={true}/>
    <PollContainer />
    </div>
  );
}

export default App;
