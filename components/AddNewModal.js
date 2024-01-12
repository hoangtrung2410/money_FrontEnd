import { Text, View, Modal, Pressable, Alert, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from 'react-native-elements'

import { addExpense, addRevenue } from '../api/main'

const AddNewModal = (props) => {
    const token = props.token
    const type = props.type
    const [name, setName] = React.useState('')
    const [amount, setAmount] = React.useState(0)
    const [day, setDay] = React.useState('')
    const [month, setMonth] = React.useState('')
    const [year, setYear] = React.useState('')
    if (!props.modalVisible) {
        return null
    }
    // day, month phai nhap 2 ky tu // year phai nhap 4 ky tu


    const handleSave = async () => {
      if(name === '' )
      {
        Alert.alert('Tên khoản chi không được để trống')
        return;
      }
      if(amount === 0 )
      {
        Alert.alert('Số tiền không được để trống')
        return;
      }
      if(day === '' || month === '' || year === '')
      {
        Alert.alert('Thời gian không được để trống(ngày/tháng/năm)')
        return;
      }
        const data = {
            name: name,
            amount: amount,
            price: amount,
            time: `${year}-${month}-${day}`
        }
      if (type === 'expense') {
        await addExpense(data, token)
          .then((res) => {
            switch (res.statusCode) {
              case 201:
                Alert.alert('Thêm khoản chi thành công')
                break;
              default:
                console.log(res)
                Alert.alert('Thêm khoản chi thất bại', res.error)
                break;
            }
          })
        } else {
            await addRevenue(data, token)
                .then((res) => {
                    switch (res.statusCode) {
                        case 201:
                            Alert.alert('Thêm khoản thu thành công')
                            break;
                        default:
                            console.log(res)
                            Alert.alert('Thêm khoản thu thất bại', res.error)
                            break;
                    }
                })
        }
        await props.setModalVisible(false)
        await props.updateData()
    }

    return (
        <Modal
            statusBarTranslucent={true}
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(false);
            }}
            accessibilityViewIsModal={true}
        >
            <Pressable
                style={{
                    backgroundColor: "#232f34",
                    opacity: 0.4,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                onPress={() => props.setModalVisible(false)}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                }}
                keyboardVerticalOffset={-58}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                    <View
                        style={{
                            maxWidth: 350,
                            width: '100%',
                            margin: 48,
                            borderRadius: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        <Text
                            style={{
                                margin: 15,
                                fontWeight: 'bold',
                                fontFamily: 'Roboto',
                                fontSize: 18,
                                flexDirection: 'row',
                                alignSelf: 'center',
                                paddingVertical: 10
                            }}
                        >
                            {type === 'expense' ? 'Thêm khoản chi' : 'Thêm khoản thu'}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 35,
                                fontSize: 10,
                            }}
                        >
                            {type === 'expense' ? 'Tên khoản chi:' : 'Tên khoản thu:'}
                        </Text>
                        <TextInput
                            style={{
                                marginLeft: 24,
                                marginRight: 24,
                                marginBottom: 24,
                                flexDirection: 'row',
                                alignSelf: 'center',
                                fontSize: 16,
                                borderBottomWidth: 1,
                                borderColor: 'grey',
                                paddingBottom: 5,
                                width: '80%',
                            }}
                            maxLength={25}
                            onChangeText={
                                (text) => {
                                    setName(text)
                                }
                            }
                        >
                        </TextInput>
                        <Text
                            style={{
                                marginLeft: 35,
                                fontSize: 10,
                            }}
                        >
                            Số tiền:
                        </Text>
                        <TextInput
                            style={{
                                marginLeft: 24,
                                marginRight: 24,
                                marginBottom: 24,
                                flexDirection: 'row',
                                alignSelf: 'center',
                                fontSize: 16,
                                borderBottomWidth: 1,
                                borderColor: 'grey',
                                paddingBottom: 5,
                                width: '80%',
                            }}
                            maxLength={12}
                            keyboardType='numeric'
                            onChangeText={
                                (text) => {
                                    setAmount(Number(text))
                                }
                            }
                        >
                        </TextInput>
                        <Text
                            style={{
                                marginLeft: 35,
                                fontSize: 10,
                            }}
                        >
                            Thời gian:
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TextInput
                                style={{
                                    marginLeft: 35,
                                    marginRight: 10,
                                    marginBottom: 24,
                                    fontSize: 16,
                                    borderBottomWidth: 1,
                                    borderColor: 'grey',
                                    width: '20%',
                                    textAlign: 'center',
                                }}
                                maxLength={2}
                                keyboardType='numeric'
                                onChangeText={
                                    (text) => {
                                        setDay(text.length === 2 ? text : '')
                                    }
                                }
                            >
                            </TextInput>
                            <Text
                                style={{
                                    fontSize: 24,
                                }}
                            >
                                /
                            </Text>
                            <TextInput
                                style={{
                                    marginLeft: 5,
                                    marginRight: 10,
                                    marginBottom: 24,
                                    fontSize: 16,
                                    borderBottomWidth: 1,
                                    borderColor: 'grey',
                                    width: '20%',
                                    textAlign: 'center',
                                }}

                                maxLength={2}
                                keyboardType='numeric'
                                onChangeText={
                                    (text) => {
                                        setMonth(text.length === 2 ? text : '')
                                    }
                                }
                            >
                            </TextInput>
                            <Text
                                style={{
                                    fontSize: 24,
                                }}
                            >
                                /
                            </Text>
                            <TextInput
                                style={{
                                    marginLeft: 5,
                                    marginRight: 10,
                                    marginBottom: 24,
                                    fontSize: 16,
                                    borderBottomWidth: 1,
                                    borderColor: 'grey',
                                    width: '20%',
                                    textAlign: 'center',
                                }}
                                maxLength={4}
                                keyboardType='numeric'
                                onChangeText={
                                    (text) => {
                                        setYear(text.length === 4 ? text : '')
                                    }
                                }
                            >
                            </TextInput>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: "space-evenly",
                                alignItems: 'center',
                                width: '100%',
                                alignSelf: 'center',
                                marginBottom: 24,
                            }}
                        >
                            <Button
                                title="Hủy"
                                type="outline"
                                onPress={() => props.setModalVisible(false)}
                                buttonStyle={{
                                    width: '60%',
                                    alignSelf: 'center',
                                }}
                            >
                            </Button>
                            <Button
                                title="Lưu"
                                type='solid'
                                buttonStyle={{
                                    width: '60%',
                                }}
                                onPress={handleSave}
                            >
                            </Button>
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView >
        </Modal>
    )
}

export default AddNewModal
