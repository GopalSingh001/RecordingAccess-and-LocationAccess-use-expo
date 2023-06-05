import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RecordingAccess from "./RecordingAccess";
import ContactAccess from "./ContactAccess";
import NotificationsAccess from "./NotificationsAccess";
import SensorAccess from "./sensorAccess/SensorAccess";

const drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <NavigationContainer>
            <drawer.Navigator initialRouteName="Recording Access">
                <drawer.Screen name="Recording Access" component={RecordingAccess} />
                <drawer.Screen name="Contact Access" component={ContactAccess} />
                <drawer.Screen name="Notifiactions Access" component={NotificationsAccess}/>
                <drawer.Screen name="Sensor Access" component={SensorAccess}/>



            </drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigation;