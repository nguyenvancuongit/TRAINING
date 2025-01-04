import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../review/home";
import DetailScreen from "../review/detail";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "../review/about";

const HomeLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ title: 'Home Page A' }}
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
                options={{ title: 'Home B' }}
            />
            <Drawer.Screen name="about"
                options={{ title: 'About B' }}
                component={AboutScreen}
            />
        </Drawer.Navigator>
    )
}

export default AppNavigation;