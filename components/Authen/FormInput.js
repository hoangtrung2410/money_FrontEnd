import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import COLORS from '../../constants/Color';
import {width, height} from '../../constants/DeviceSize';
import {Ionicons} from '@expo/vector-icons';

const FormInput = props => {
  const onChangeText = text => {
    props.setValue (text);
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}> 
      <Text style={styles.topic}>{props.topic}</Text>
      <View style={styles.input}>
        <TextInput
          onChangeText={text => onChangeText (text)}
          placeholder={props.placeholder}
          secureTextEntry={props.statePassword === false && props.category === "password" ? true : null}
          style={{width: props.category === 'password' ? '90%' : '100%'}}
          keyboardType={props.category === 'email' ? 'email-address' : null}
        />
        {props.category === 'password'
          ? props.statePassword === true
              ? <TouchableOpacity onPress={props.setIsShow}>
                  <Ionicons name="eye" size={24} color={'#1D5461'} />
                </TouchableOpacity>
              : <TouchableOpacity onPress={props.setIsShow}>
                  <Ionicons
                    name="eye-off"
                    size={24}
                    color={'#1D5461'}
                  />
                </TouchableOpacity>
          : null}
      </View>

    </ScrollView>
  );
};

export default FormInput;

const styles = StyleSheet.create ({
  input: {
    height: height * 0.05,
    width: width * 0.83,
    borderWidth: 1,
    borderColor: '#1D5461',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D5461',
  },
});
