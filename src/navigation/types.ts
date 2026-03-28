import type { MarketplaceCard } from "../core/types/domain";

export type RootStackParamList = {
  SignIn: undefined;
  BuyerTabs: { screen?: string } | undefined;
  MerchantTabs: undefined;
  ProductDetail: { product: MarketplaceCard };
  Checkout: undefined;
  OrderDetail: { orderId: string };
  MerchantOrderDetail: { orderId: string };
  Reviews: undefined;
  Promotions: undefined;
};
