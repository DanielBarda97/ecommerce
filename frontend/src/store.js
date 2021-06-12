import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
  productListReducer, 
  productDetailsReducer 
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer 
} from './reducers/userReducers'
import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderListMyReducer, 
  orderPayReducer 
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer
})

const cartItemFromStore = localStorage.getItem('cartItem') 
? JSON.parse(localStorage.getItem('cartItem')) 
: []

const userInfoFromStore = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo')) 
: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress')) 
: {}

const initialState = {
  cart: { 
    cartItems: cartItemFromStore, 
    shippingAddress: shippingAddressFromStorage 
  },
  userLogin: { userInfo: userInfoFromStore },
}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store