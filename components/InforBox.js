import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';

const InforBox = (props) => {
  const { width, height } = Dimensions.get("window");
  const { name, price, time, func, editFunc, deleteFunc } = props
  return (
    <TouchableOpacity
      onPress={func}
    >
      <View
        style={{
          width: width * 0.95,
          alignSelf: 'center',
          marginHorizontal: 50,
          marginTop: 10,
          backgroundColor: 'white',
          padding: 25,
          borderRadius: 10,
          borderColor: '#1D5461',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 15,
              width: width * 0.3,

            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 30,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              width: width * 0.3,
            }}
          >
            {time}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 5,
            paddingLeft: 15,
          }}
        >
          <Icon 
          name="edit" 
          size={24} 
          color="#9ABDDC"
          onPress={() => {
            editFunc()
          }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}
        >
          <Icon 
          name="delete" 
          size={24} 
          color="#FF7F7F" 
          onPress={
            () => {
              deleteFunc()
            }
          }
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default InforBox