import { createHashHistory } from 'history';

import Draft from '../views/draft/draft.jsx';
import LearnDemo from '../views/learn_demo/learn_demo.jsx';
import ShowComponents from '../views/show_components/show_components.jsx';

export const history = createHashHistory();


const DraftPage = {
	Path: '/draft',
	Component: Draft,
}

const LearnDemoPage = {
	Path: '/learn_demo/*',
	Component: LearnDemo,
}

const ShowComponentsPage = {
	Path: '/show_components/*',
	Component: ShowComponents,
}


const Pages = [
	DraftPage,
	LearnDemoPage,
	ShowComponentsPage,
];

export default Pages;