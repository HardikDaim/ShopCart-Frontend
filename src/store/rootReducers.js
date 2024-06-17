import themeReducer from "./reducers/themeReducer";
import homeReducer from './reducers/homeReducer';
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";


const rootReducers = {
    theme : themeReducer,
    auth : authReducer,
    home : homeReducer,
    cart : cartReducer,
}
export default rootReducers;