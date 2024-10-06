import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/Tasks_redux/slice/tasksSlice";
import authReducer from "../features/auth/authSlice";
import { create } from "zustand";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});

interface CartItem {
  productName: string;
  productPrice: number;
  quantity: number;
}

interface ClickState {
  cart: Record<string, CartItem>;
  increment: (id: string | number, productName: string, price: number) => void;
}

export const useStore = create<ClickState>((set) => ({
  cart: {},
  increment: (id, productName, price) => set((state) => {
    const currentItem = state.cart[id] || { productName, productPrice: price, quantity: 0 };
    const newQuantity = currentItem.quantity + 1;
    
    return {
      cart: {
        ...state.cart,
        [id]: { ...currentItem, quantity: newQuantity }
      }
    };
  }),
}));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
