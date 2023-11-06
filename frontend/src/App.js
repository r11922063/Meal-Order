import logo from './logo.svg';
import './App.css';
import CustomerNavBar from './components/CustomerNavBar';

// const result = await fetch('http://localhost:8081/allMeals').then((res) => {return res.json();});

function App() {
  return (
    <div className="App">
      <CustomerNavBar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {/* { result.msg } */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;