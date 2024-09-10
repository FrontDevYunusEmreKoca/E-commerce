
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';

import RouterConfig from './config/RouterConfig';


function App() {
  return (
    <div className="App">
     
       <Header />
       <RouterConfig />
       <Loading />
       
    </div>
  );
}

export default App;
