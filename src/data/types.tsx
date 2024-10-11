// Define types for stack navigator screens
export type AuthStackParamList = {
    Index: undefined;
    Login: undefined;
    Register: undefined;
  };
  
  // Define types for tab navigator screens
  export type TabParamList = {
    Home: undefined;
    Explore: undefined;
    Cart: undefined;
  };
  
  // Define types for nested stack screens within the TabNavigator
  export type HomeStackParamList = {
    Home: undefined;
    SuperFlashSale: undefined;
    SuperMegaSale: undefined;
    Notification: undefined;
    Favorite: undefined;
    NotificationActivity: undefined;
    NotificationOffer: undefined;
    NotificationFeed: undefined;
    ProductDetail: undefined;
    ReviewProduct: undefined;
    WriteReview: undefined;
    ConformCart: undefined;
    ShipTo:undefined;
  };
  
  // Combine all navigators into a single type if needed
  export type RootStackParamList = AuthStackParamList & HomeStackParamList & {
    TabNavigator: undefined; // This is the main TabNavigator
  };
  