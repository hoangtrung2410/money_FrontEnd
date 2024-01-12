import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../context/authContext';
import { loginAndSaveUser } from '../../utils/Auth/loginAndSaveUser';
import { useWindowDimensions } from 'react-native';

export const Login = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const window = useWindowDimensions();

    const auth = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        const data = {
            email: userName,
            password: password,
        }

        try {
            const response = await loginAndSaveUser(data);
            if (response.status === "success") {
                const user = {
                    token: response.userData.token,
                    userName: response.userData.username,
                    email: userName
                }
                auth.setUser(user);
            } else {
                Alert.alert('Thất bại', 'Vui lòng kiểm tra lại thông tin đăng nhập');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#EDEDED',
            }}
        >
            <View
                style={{
                    // full width but padding on left and right
                    height: window.height * 0.57,
                    width: window.width * 0.95,
                    backgroundColor: '#1D5461',
                    borderRadius: 20,
                }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 40,
                    }}
                >
                    <Ionicons name="wallet-outline" size={100} color="#EDEDED" />
                </View>
                <View
                    style={{
                        marginTop: 20,
                        paddingTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            marginHorizontal: 20,
                            color: '#EDEDED',
                        }}
                    >
                        Email
                    </Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#EDEDED',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            fontSize: 15,
                            paddingBottom: 10,
                            color: 'white',
                        }}
                        onChangeText={text => setUserName(text)}
                    >
                    </TextInput>
                </View>
                <View
                    style={{
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            marginHorizontal: 20,
                            color: 'white',
                        }}
                    >
                        Password
                    </Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#EDEDED',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            fontSize: 15,
                            paddingBottom: 10,
                            color: 'white',
                        }}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    >
                    </TextInput>
                    <View
                        style={{
                            marginTop: 30,
                            height: 40,
                            width: window.width * 0.5,
                            alignSelf: 'center',
                        }}
                    >
                        {
                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    backgroundColor: '#EDEDED',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={handleLogin}
                            >
                                {
                                    loading ?
                                        (<ActivityIndicator size="small" color="#1D5461" />)
                                        :
                                        (<Text style={{
                                            color: "#1D5461",
                                            fontSize: 15,
                                        }}>Đăng nhập</Text>)
                                }

                            </TouchableOpacity>}

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                marginTop: 18,
                                alignItems: 'center',
                                height: 40,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ForgotPassword');
                                }}
                                style={{ marginRight: 20 }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Signup');
                                }}
                                style={{ marginLeft: 20 }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;