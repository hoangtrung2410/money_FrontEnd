import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import COLORS from '../../constants/Color';
import { width, height } from '../../constants/DeviceSize';
import FormInput from '../../components/Authen/FormInput';

import { useState } from 'react';
import { sendOTPMail } from '../../utils/Auth/sendOTPMail';

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState('');

  const handleSendOTP = async () => {
    if (mail === '') {
      Alert.alert("Email trống", "Vui lòng nhập email để nhận mã OTP")
    } else {
      try {
        console.log(mail);
        const res = await sendOTPMail(mail);
        console.log("res: ", res);
        if (res.status === 'success') {
          Alert.alert("Thành công", res.message)
          navigation.navigate('ConfirmOTP', { mail: mail })
        } else {
          Alert.alert("Thất bại", res.message)
        }
      } catch (error) {
        Alert.alert("Lỗi", error)
      }
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EDEDED',
      }}
    >
      <ImageBackground
      >
        <View style={{ paddingLeft: width * 0.07 }}>
          <Text style={styles.textTitle}>Quên mật khẩu</Text>

          <FormInput
            topic="Email xác thực"
            placeholder="Nhập email xác thực"
            setValue={setMail}
          />

          <View
            style={{
              width: width * 0.83,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={styles.buttonSingIn}
              onPress={handleSendOTP}
            >
              {
                loading ?
                  (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={{ color: 'white' }}>Tiếp tục</Text>
                  )
              }

            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingRight: width * 0.1,
            }}
          >
            <Text style={{ color: '#1D5461' }}>
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
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

export default ForgotPassword;

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
