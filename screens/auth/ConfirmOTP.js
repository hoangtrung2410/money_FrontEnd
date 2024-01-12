import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import COLORS from '../../constants/Color';
import { width, height } from '../../constants/DeviceSize';
import FormInput from '../../components/Authen/FormInput';

import { checkCodeOTP } from '../../utils/Auth/checkCodeOTP';

const ConfirmOTP = ({ route, navigation }) => {
  const [OTP, setOTP] = useState('')
  const { mail } = route.params;

  const handleCheckOTP = async () => {
    if (OTP === '') {
      Alert.alert("Mã OTP trống", "Vui lòng nhập mã OTP")
    } else {
      const  data = {
        email: mail,
        verificationCode: OTP
      }
      const res = await checkCodeOTP(data);
      if (res.status === 'success') {
        Alert.alert("Thành công", res.message)
        navigation.navigate('ResetPassword', { mail: mail })
      } else {
        Alert.alert("Thất bại", res.message)
      }
    }
  }
  return (
    <SafeAreaView>
      <ImageBackground
      >
        <View style={{ paddingLeft: width * 0.07 }}>
          <Text style={styles.textTitle}>Quên mật khẩu</Text>

          <FormInput
            topic="Mã xác thực"
            placeholder="Nhập mã xác thực"
            setValue={setOTP}
          />

          <Text style={{ color: '#1D5461'}}> Mã xác thực đã được gửi tới email.....</Text>

          <View
            style={{
              width: width * 0.75,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              style={styles.buttonSingIn}
              onPress={handleCheckOTP}
            >
              <Text style={{color:'white'}} >Xác nhận</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: width * 0.7,
            }}
          >
            <Text style={{ color: '#1D5461' }}>
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <Text
                style={{
                  color: '#1D5461',
                  fontWeight: 'bold',
                  paddingLeft: 5,
                }}
              >
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

    </SafeAreaView>
  );
};

export default ConfirmOTP;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1D5461',
    marginBottom: 20,
  },
  buttonSingIn: {
    height: height * 0.05,
    width: width * 0.3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    borderWidth: 1,
    elevation: 10,
    backgroundColor: '#1D5461',
  },
});
