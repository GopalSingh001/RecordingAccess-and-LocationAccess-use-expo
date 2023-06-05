import React from 'react';
import { View, Text } from 'react-native';
import AccelerometerSensor from './AccelerometerAccess';
 import BarometerSensor from './BarometerSensor';
import LightSensorAccess from './LightSensor';
import MagnetometerSensor from './MagnetometerSensorAccess';

 

const SensorAccess = () => {
  return (
     <View style={{alignItems:'center'}}>
        <AccelerometerSensor/>
        <BarometerSensor/>
        <LightSensorAccess/>
        <MagnetometerSensor/>
     </View>
  );
}

export default SensorAccess;
