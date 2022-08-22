import './App.css'
import ExcelFileReader from './components/ExcelFileReader'
import store from './components/redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ExcelFileReader />
      </Provider>
    </div>
  );
}

export default App;
