// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

// Reducers & APIs
import merchantSlice from "./features/auth/merchantSlice";
import status from "./features/uiBuilder/status";
import { webBuilder } from "./features/webBuilder/webBuilder";
import { productsApi } from "./features/products/products";
import { authSlice } from "./features/auth/authMerchant";
import { shopApi } from "./features/shop/shop";
import editorReducer from "./features/editor";
import shopNameSlice from "./features/shop/shopNameSlice";
// import { publicShopSlice } from "./features/shop/publicShopSlice";
import currentPage from "./features/admin-my/currentPageSlice";
import currentIdPage from "./features/admin-my/woking-page";
import promptSlice from "./features/prompt";
import accountSlice from "./features/auth/accountSlice";
import notificationSlice from "./features/notification/notificationSlice";
import currentMerchantSlice from "./features/merchant/merchantSlice";
import selectedTemplateSlice from "./features/templates/templateSlice";
import AdminEditor from "./features/admin-my/admin-editor";
import { accountApi } from "./features/auth/accountApi";
import { templateApi } from "./features/templates/templateApi";
import storage from "./storage";
import { merchantTemplateApi } from "./features/merchantTemplates/buyedTemplateApi";
import cartReducer from './features/cart/cartSlice';
import { orderApi } from "./features/orders/ordersApi";



// 🔐 Persist Configuration
const persistConfig = {
	key: "account",
	storage,
	whitelist: ["firestName", "email", "accessToken", "role", "id", "profileUrl"], // Make sure these exist in accountSlice state
};

const persistedAccountReducer = persistReducer(persistConfig, accountSlice);

// 🧠 Combine All Reducers
const rootReducer = combineReducers({
	[webBuilder.reducerPath]: webBuilder.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[accountApi.reducerPath]: accountApi.reducer,
	[authSlice.reducerPath]: authSlice.reducer,
	[shopApi.reducerPath]: shopApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
	[templateApi.reducerPath]: templateApi.reducer,
	[merchantTemplateApi.reducerPath]: merchantTemplateApi.reducer,
	// [publicShopSlice.reducerPath]: publicShopSlice.reducer,

	merchant: merchantSlice,
	shopName: shopNameSlice,
	currentMerchant: currentMerchantSlice,
	selectedTemplate: selectedTemplateSlice,
	notification: notificationSlice,
	currentPage,
	currentIdPage,
	account: persistedAccountReducer,  
	AdminEditor,
	status,
	editor: editorReducer,
	prompt: promptSlice,
	cart: cartReducer,

});

// 🏭 Store Factory
export const makeStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(
				webBuilder.middleware,
				productsApi.middleware,
				authSlice.middleware,
				shopApi.middleware,
				templateApi.middleware,
				merchantTemplateApi.middleware,
				accountApi.middleware,
				orderApi.middleware,
				// publicShopSlice.middleware
			),
	});

// 🏪 Store + Persistor
export const store = makeStore();
export const persistor = persistStore(store);

// 🔁 Optional for refetchOnFocus, refetchOnReconnect
setupListeners(store.dispatch);
