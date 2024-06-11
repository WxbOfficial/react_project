import { createStore, combineReducers } from "redux";
import modelEditor from './model_editor/model_editor.js'

const store = createStore(combineReducers({
	modelEditor,
}))

export default store;