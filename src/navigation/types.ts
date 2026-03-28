import type { MarketplaceCard, Order } from "../core/types/domain";

export type RootStackParamList = {
  SignIn: undefined;
  BuyerTabs: undefined;
  MerchantTabs: undefined;
  ProductDetail: { product: MarketplaceCard };
  Checkout: undefined;
  OrderDetail: { order: Order };
  MerchantOrderDetail: { order: any };
  Reviews: undefined;
  Promotions: undefined;
};
