import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';
import React from 'react';
import FormInput from '../../components/FormInput';

const { width, height } = Dimensions.get("window");

import { signUp } from '../../api/auth';

export const Signup = ({ navigation }) => {
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [gmail, setGmail] = React.useState('');
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = React.useState(false);

    const handleSignUp = async () => {
        if (
            name === '' ||
            password === '' ||
            confirmPassword === '' ||
            gmail === ''
        ) {
            Alert.alert('Thất bại', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if(password.length < 8) {
            Alert.alert('Thất bại', 'Mật khẩu phải có ít nhất 8 kí tự');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Thất bại', 'Mật khẩu không trùng khớp');
            return;
        }
        const data = {
            name: name,
            email: gmail,
            password: password,
        }
        await signUp(data)
            .then((response) => {
                console.log(response);
                if (response.statusCode === 201) {
                    Alert.alert('Thành công', 'Đăng ký thành công');
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Thất bại', 'Email đã tồn tại');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const onPressShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const onPressShowConfirmPassword = () => {
        setIsShowConfirmPassword(!isShowConfirmPassword);
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                // grey as background color
                backgroundColor: "#EDEDED",
                justifyContent: 'center',
            }}
        >
            <View style={{
                width: width * 0.95,
                alignSelf: 'center',
                marginLeft: 50,
            }}>
                <Text style={styles.textTitle}>Đăng ký tài khoản</Text>

                <FormInput
                    topic="Họ và tên"
                    setValue={setName}
                    placeholder="Nhập họ và tên"
                />
                <FormInput
                    topic="Email"
                    setValue={setGmail}
                    placeholder="Nhập email"
                />

                <FormInput
                    topic="Mật khẩu"
                    setValue={setPassword}
                    placeholder="Nhập mật khẩu đăng nhập"
                    category="password"
                    statePassword={isShowPassword}
                    setIsShow={onPressShowPassword}
                />

                <FormInput
                    topic="Xác nhận mật khẩu"
                    setValue={setConfirmPassword}
                    placeholder="Nhập lại mật khẩu đăng nhập"
                    category="password"
                    statePassword={isShowConfirmPassword}
                    setIsShow={onPressShowConfirmPassword}
                />

                <View
                    style={{
                        width: width * 0.82,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginVertical: 20,
                    }}
                >
                    <TouchableOpacity
                        style={styles.buttonSingIn}
                        onPress={handleSignUp}
                    >
                        <Text style={{ color: "#1D5461", fontSize:15, fontWeight: "bold" }}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: width * 0.7,
                    }}
                >
                    <Text style={{ color: "#1D5461" }}>
                        Bạn đã có tài khoản?
                    </Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Login') }}
                    >
                        <Text
                            style={{
                                color: "#1D5461",
                                fontWeight: 'bold',
                                paddingLeft: 5,
                            }}
                        >
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#1D5461",
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
        backgroundColor: '#EDEDED',
        fontSize: 15,
    },
});