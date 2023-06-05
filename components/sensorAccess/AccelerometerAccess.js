import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Button } from 'react-native';

export default function AccelerometerSensor() {
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setAccelerometer(accelerometerData);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ alignItems: 'center' }}>
        <Text style={{color:'red',backgroundColor:'pink',padding:6}}>Accelerometer</Text>
      <Text>X: {accelerometer.x.toFixed(2)}</Text>
      <Text>Y: {accelerometer.y.toFixed(2)}</Text>
      <Text>Z: {accelerometer.z.toFixed(2)}</Text>
      <View style={{flexDirection:'row',gap:10,marginTop:10}}>
      <Button title='Slow' color={'red'} onPress={()=>Accelerometer.setUpdateInterval(2000)}/>
      <Button title='Fast' color={'green'} onPress={()=>Accelerometer.setUpdateInterval(50)}/>
      </View>
      

    </View>
  );
}

