import { Route, Routes } from "react-router-dom";

import LearnState from './learn_state.jsx';
import LearnCallback from './learn_callback.jsx';
import LearnCallbackRef from './learn_callback_ref.jsx';
import LearnUseMemo from './learn_use_memo.jsx';
import LearnMemo from './learn_memo.jsx';

import ClassComponent from './class_component.jsx';

// import BabylonAccumulate from './babylon_accumulate/babylon_accumulate.jsx';


const ClassComponentPage = {
	Path: '/class_component',
	Component: ClassComponent,
}

const LearnStatePage = {
	Path: '/learn_state',
	Component: LearnState,
}

const LearnCallbackPage = {
	Path: '/learn_callback',
	Component: LearnCallback,
}

const LearnCallbackRefPage = {
	Path: '/learn_callback_ref',
	Component: LearnCallbackRef,
}

const LearnUseMemoPage = {
	Path: '/learn_use_memo',
	Component: LearnUseMemo,
}

const LearnMemoPage = {
	Path: '/learn_memo',
	Component: LearnMemo,
}

// const BabylonAccumulatePage = {
// 	Path: '/babylon_accumulate/*',
// 	Component: BabylonAccumulate,
// }

const Pages = [
	ClassComponentPage,
	LearnStatePage, LearnCallbackPage, LearnCallbackRefPage, LearnUseMemoPage, LearnMemoPage,
	// BabylonAccumulatePage,
];

export default function LearnDemo(){

	return (
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
	)
}