import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import React from 'react';
import COLORS from '../../constants/Color';
import { width, height } from '../../constants/DeviceSize';
import FormInput from '../../components/Authen/FormInput';
import { changePass } from '../../utils/Auth/changePass';

const ResetPassword = ({ route, navigation }) => {
  const { mail } = route.params;
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);

  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = React.useState(
    false
  );

  const onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onPressShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  }; 4

  const handleResetPassword = async () => {
    if (password === '' || confirmPassword === '') {
      Alert.alert('Mật khẩu trống', 'Vui lòng nhập mật khẩu');
    } else if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không khớp', 'Vui lòng nhập lại mật khẩu');
    } else {
      const data = {
        email:mail,
        newPassword:password
      }
      // call api reset password
      const res = await changePass(data);
      if (res.status === 'success') {
        Alert.alert('Thành công', res.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Thất bại', res.message);
      }
    }
  }

  return (
    <SafeAreaView>
      <ImageBackground
      >
        <View style={{ paddingLeft: width * 0.07 }}>
          <Text style={styles.textTitle}>Đặt lại mật khẩu</Text>
          <FormInput
            topic="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            setValue={setPassword}
            category="password"
            statePassword={isShowPassword}
            setIsShow={onPressShowPassword}
          />

          <FormInput
            topic="Xác nhận mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            setValue={setConfirmPassword}
            category="password"
            statePassword={isShowConfirmPassword}
            setIsShow={onPressShowConfirmPassword}
          />

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
              onPress={handleResetPassword}
            >
              <Text style={{ color:'white' }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: width * 0.7,
            }}
          >
            <Text style={{ color: '#1D5461'}}>
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }
              }
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

export default ResetPassword;

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
