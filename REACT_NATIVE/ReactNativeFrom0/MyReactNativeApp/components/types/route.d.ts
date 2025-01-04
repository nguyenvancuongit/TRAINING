type RootStackParamList = {
    "home": undefined;
    "review-detail": {id: number, title: string, star: number} | undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}