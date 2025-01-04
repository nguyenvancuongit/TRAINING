type RootStackParamList = {
    "home": undefined;
    "review-detail": {id: number, title: string, rating: number} | undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

declare module "*.png"