import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { LightSensor } from 'expo-sensors';

export default function LightSensorAccess() {
  const [light, setLight] = useState(0);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    return () => {
      unsubscribeFromLightSensor();
    };
  }, []);

  const toggleLightSensor = async () => {
    if (subscription) {
      unsubscribeFromLightSensor();
      console.log(light)
    } else {
      subscribeToLightSensor();
      console.log(light);
    }
  };

  const subscribeToLightSensor = async () => {
    LightSensor.isAvailableAsync().then(result => {
      if (result) {
        const newSubscription = LightSensor.addListener(({ light }) => {
          setLight(light);
        });
        setSubscription(newSubscription);
      } else {
        console.log('Light sensor is not available on this device.');
      }
    });
  };

  const unsubscribeFromLightSensor = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  return (
    <View style={{alignItems:'center'}}>
        <Text style={{color:'red',marginTop:10,marginBottom:10,backgroundColor:'pink',padding:6}}>Light Sensor</Text>
      <Text>Light: {light}</Text>
      <Button
      color={'black'}
        title={subscription ? 'Stop Light Sensor' : 'Start Light Sensor'}
        onPress={toggleLightSensor}
      />
    </View>
  );
}
