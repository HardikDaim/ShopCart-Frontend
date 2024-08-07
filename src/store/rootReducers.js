import themeReducer from "./reducers/themeReducer";
import homeReducer from './reducers/homeReducer';
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import chatReducer from "./reducers/chatReducer";
import searchReducer from "./reducers/searchReducer";
import paymentReducer from "./reducers/paymentReducer";


const rootReducers = {
    theme : themeReducer,
    auth : authReducer,
    home : homeReducer,
    cart : cartReducer,
    order : orderReducer,
    dashboard : dashboardReducer,
    chat : chatReducer,
    search : searchReducer,
    payment : paymentReducer,
}
export default rootReducers;