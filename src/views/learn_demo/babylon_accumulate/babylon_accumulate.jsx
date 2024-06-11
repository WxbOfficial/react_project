import { Route, Routes } from "react-router-dom";

import GltfLoader from './gltf_loader.jsx';

const GltfLoaderPage = {
	Path: '/gltf_loader',
	Component: GltfLoader,
}

export default function ShowComponents(){

	return (
		<Routes>
			{
				[
					GltfLoaderPage,
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