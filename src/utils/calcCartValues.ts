import { ICartItem } from '../redux/slices/cartSlice';

export const calcCartValues = (items: ICartItem[]) => {
  const totalPrice = items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
  const totalCount = items.reduce((sum, obj) => obj.count + sum, 0);
  return {
    totalPrice,
    totalCount,
  };
};
