import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {width, height} from '../../constants/DeviceSize';
import COLORS from '../../constants/Color';
import FormInput from '../../components/Authen/FormInput';
import {Ionicons} from '@expo/vector-icons';

const AuthenEmail = () => {
  const [email, setEmail] = React.useState('');
  const [showAuthenEmail, setShowAuthenEmail] = React.useState(false);
  const [bottom, setBottom] = React.useState(200);

  const onPressContinue = () => {
    if (showAuthenEmail === false) {
      setShowAuthenEmail(true);
    }
  };

  const onPressBack = () => {
    if (showAuthenEmail === true) {
      setShowAuthenEmail(false);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#EDEDED",
        justifyContent: 'center',
      }}
    >
      <ImageBackground>
        <KeyboardAvoidingView behavior='padding'>
          <View style={{paddingLeft: width * 0.07}}>
            <TouchableOpacity onPress={onPressBack} style={{bottom: bottom}}>
              <Ionicons
                name="arrow-back-circle"
                size={45}
                color={COLORS.nutritionDiary.dateBoxOn}
              />
            </TouchableOpacity>

            <Text style={styles.textTitle}>Đăng ký tài khoản</Text>

            {showAuthenEmail === false ? (
              <FormInput topic="Email đăng ký" placeholder="Nhập email đăng ký"/>
            ) : (
              <FormInput topic="Mã xác thực" placeholder="Nhập mã xác thực"/>
            )}

            <View
              style={{
                width: width * 0.75,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginVertical: 20,
              }}
            >
              <TouchableOpacity style={styles.buttonSingIn} onPress={onPressContinue}>
                <Text style={{color: COLORS.login.buttonSingIn}}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: width * 0.7,
              }}
            >
              <Text style={{color: COLORS.login.text}}>Bạn đã có tài khoản?</Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.login.text,
                    fontWeight: 'bold',
                    paddingLeft: 5,
                  }}
                >
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );

  export default AuthenEmail;

  const styles = StyleSheet.create({
    imageBackground: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    textTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: COLORS.login.text,
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
      backgroundColor: 'white',
    },
  })
}