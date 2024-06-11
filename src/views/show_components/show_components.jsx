import { Route, Routes } from "react-router-dom";

import ShowNumberInput from './show_number_input.jsx';
import ShowNumberSlider from './show_number_slider.jsx';

const ShowNumberInputPage = {
	Path: '/show_number_input',
	Component: ShowNumberInput,
}

const ShowNumberSliderPage = {
	Path: '/show_number_slider',
	Component: ShowNumberSlider,
}


export default function ShowComponents(){

	return (
		<Routes>
			{
				[
					ShowNumberInputPage, ShowNumberSliderPage,
				].map((Page)=>{
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