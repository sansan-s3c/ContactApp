import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Avatar, Button, Overlay} from 'react-native-elements';

export default function ModalSucces({visible}) {
  return (
    <Overlay
      isVisible={visible}
      overlayStyle={{
        borderRadius: 20,
        bottom: 30,
        position: 'absolute',
        width: 100,
      }}>
      <Text style={{alignSelf: 'center'}}>Success!</Text>
    </Overlay>
  );
}
