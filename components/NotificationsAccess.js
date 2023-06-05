// import React, { useEffect } from 'react';
// import { View, Button } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

// const NotificationAccess = () => {
//   useEffect(() => {

//     const getNotificationPermission = async () => {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       if (status !== 'granted') {
//         console.log('Notification permission not granted!');
//         return;
//       }


//   await Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     }),
//   });
// };

//     getNotificationPermission();
//   }, []);

//   const sendNotification = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: 'My Notification',
//         body: 'This is the body of the default notification',
//       },
//       trigger: null,  
//     });
//   };

//   return (
//     <View style={{alignItems:'center'}}>
//       <Button color={'green'} title="Send Notification" onPress={sendNotification} />
//     </View>
//   );
// };

// export default NotificationAccess;


import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationAccess() {
    const [notificationToken, setNotificationToken] = useState(null);

    useEffect(() => {
        registerForPushNotifications();
    }, []);

    const registerForPushNotifications = async () => {
        try {
            await Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                }),
            });

            const { status } = await Notifications.requestPermissionsAsync();

            if (status === 'granted') {
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                setNotificationToken(token);
                console.log(token);
                const sendNotification = async () => {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'My Notification',
                            body: 'This is the body of the default notification',
                        },
                        trigger: null,
                    });
                };

                sendNotification()
            } else {
                console.log('Notification permission denied.');
            }

        } catch (error) {
            console.log('Error while requesting notification permissions:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {notificationToken ? (
                <Text>Notification Token: {notificationToken}</Text>
            ) : (
                <Text>Waiting for notification permission...</Text>
            )}
            <Button title="Request Permission" onPress={registerForPushNotifications} />
        </View>
    );
}

