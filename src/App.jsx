import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import Pages, { history } from './router/router.js';
import store from './store/store.js';
import './App.scss';

function App() {
	return (
		<Provider store={store}>
			<HashRouter history={history}>
				<Routes>
					{
						Pages.map((Page)=>{
							return (
								<Route
									key={Page.Path}
									path={Page.Path}
									element={<Page.Component/>} />
							)
						})
					}
				</Routes>
			</HashRouter>
		</Provider>
	);
}

export default App;


// import App from './views/interview/register/register_app.jsx';

// export default App;
