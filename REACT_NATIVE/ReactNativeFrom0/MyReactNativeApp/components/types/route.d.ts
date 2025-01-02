type RootStackParamList = {
    "home": undefined;
    "review-detail": undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}