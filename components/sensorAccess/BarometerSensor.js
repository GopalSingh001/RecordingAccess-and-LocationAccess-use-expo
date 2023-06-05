 
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Barometer } from 'expo-sensors';

export default function BarometerSensor() {
  const [pressure, setPressure] = useState(0);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    subscribeToBarometer();

    return () => {
      unsubscribeFromBarometer();
    };
  }, []);

  const subscribeToBarometer = async () => {
    Barometer.isAvailableAsync().then(result => {
      if (result) {
        const newSubscription = Barometer.addListener(({ pressure }) => {
          setPressure(pressure);
        });
        setSubscription(newSubscription);
      } else {
        console.log('Barometer is not available on this device.');
      }
    });
  };

  const unsubscribeFromBarometer = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  return (
    <View>
        <Text style={{color:'red',marginTop:10,textAlign:'center',backgroundColor:'pink',padding:6}}>BarometerSensor</Text>
      <Text>Pressure: {pressure.toFixed(2)} hPa</Text>
    </View>
  );
}
