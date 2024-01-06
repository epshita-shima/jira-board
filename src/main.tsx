import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/index.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import 'daisyui/dist/full.css';
// import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
// import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
// import 'admin-lte/dist/css/adminlte.min.css';

// import 'admin-lte/plugins/jquery/jquery.min.js';
// import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
// import 'admin-lte/dist/js/adminlte.min.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
    <RouterProvider router={routes}/>
    </Provider>
)
