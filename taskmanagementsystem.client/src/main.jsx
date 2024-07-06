import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './common/redux/store.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
  //</React.StrictMode>,
)
