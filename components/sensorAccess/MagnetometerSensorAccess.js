import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function MagnetometerSensor() {
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    subscribeToMagnetometer();

    return () => {
      unsubscribeFromMagnetometer();
    };
  }, []);

  const subscribeToMagnetometer = async () => {
    Magnetometer.isAvailableAsync().then(result => {
      if (result) {
        const newSubscription = Magnetometer.addListener(magnetometerData => {
          setMagnetometerData(magnetometerData);
        });
        setSubscription(newSubscription);
      } else {
        console.log('Magnetometer is not available on this device.');
      }
    });
  };

  const unsubscribeFromMagnetometer = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  return (
    <View style={{alignItems:'center'}}>
        <Text style={{color:'red',marginTop:10,marginBottom:10,padding:6,backgroundColor:'pink'}}>Magnetometer Sensor</Text>
      <Text>X: {magnetometerData.x.toFixed(2)}</Text>
      <Text>Y: {magnetometerData.y.toFixed(2)}</Text>
      <Text>Z: {magnetometerData.z.toFixed(2)}</Text>
    </View>
  );
}
