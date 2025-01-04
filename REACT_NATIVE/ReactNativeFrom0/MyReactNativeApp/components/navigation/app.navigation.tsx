import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../review/home";
import DetailScreen from "../review/detail";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "../review/about";
import AppHeader from "./app.header";

const HomeLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ header: () => <AppHeader /> }}
            />
            <Stack.Screen
                name="review-detail"
                component={DetailScreen}
                options={{ title: 'Detail Page A' }}
            />
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="home1"
                component={HomeLayout}
                options={{ title: 'Home B', header: () => null }}
            />
            <Drawer.Screen name="about"
                options={{ title: 'About B', header: () => <AppHeader /> }}
                component={AboutScreen}
            />
        </Drawer.Navigator>
    )
}

export default AppNavigation;