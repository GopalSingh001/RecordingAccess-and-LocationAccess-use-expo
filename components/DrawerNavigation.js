import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RecordingAccess from "./RecordingAccess";
import ContactAccess from "./ContactAccess";

const drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <NavigationContainer>
            <drawer.Navigator initialRouteName="Recording Access">
                <drawer.Screen name="Recording Access" component={RecordingAccess} />
                <drawer.Screen name="Contact Access" component={ContactAccess} />

            </drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigation;