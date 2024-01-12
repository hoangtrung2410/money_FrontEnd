import { Text, View, Modal, Pressable, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from 'react-native-elements'

import { updateRevenue, updateExpense } from '../api/main'

const EditModal = (props) => {
    const type = props.type
    const token = props.token
    const [data, setData] = React.useState(props.expense ? props.expense : props.revenue)
    const [newName, setNewName] = React.useState(props.expense ? props.expense.name : props.revenue.name)
    const [newPrice, setNewPrice] = React.useState(props.expense ? props.expense.price : props.revenue.amount)
    const [updateData, setUpdateData] = React.useState(null)

    useEffect(() => {
        setData(props.expense ? props.expense : props.revenue)
    }, [props])

    useEffect(() => {
        setUpdateData({
            name: newName,
            price: newPrice,
            amount: newPrice,
            expenseId: type === 'expense' ? data.id : null,
            revenueId: type === 'revenue' ? data.id : null,
        })
    }, [newName, newPrice])

    if (!props.modalVisible) {
        return null
    }

    const handleUpdate = async () => {
        try {
            if (type === 'expense') {
                await updateExpense(updateData, token)
                    .then((res) => {
                        switch (res.statusCode) {
                            case 200:
                                Alert.alert('Thành công', 'Cập nhật thành công')
                                break;
                            default:
                                console.log(res)
                                Alert.alert('Thất bại', 'Cập nhật thất bại')
                                break;
                        }
                    })
            } else {
                await updateRevenue(updateData, token)
                    .then((res) => {
                        switch (res.statusCode) {
                            case 200:
                                Alert.alert('Thành công', 'Cập nhật thành công')
                                break;
                            default:
                                console.log(res)
                                Alert.alert('Thất bại', 'Cập nhật thất bại')
                                break;
                        }
                    })
            }
            await props.setModalVisible(false)
            await props.updateData()
            await props.reset()
        }
        catch (error) {
            console.log(error)
        }
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
                style={{ flex: 1 }}
                keyboardVerticalOffset={-80}
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
                            {props.expense ? 'Chỉnh sửa khoản chi' : 'Chỉnh sửa khoản thu'}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 35,
                                fontSize: 10,
                            }}
                        >
                            {props.expense ? 'Tên khoản chi' : 'Tên khoản thu'}
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
                            defaultValue={data.name}
                            maxLength={25}
                            onChangeText={
                                (text) => setNewName(text)
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
                            defaultValue={data.price ? data.price.toString() : data.amount.toString()}
                            maxLength={12}
                            keyboardType='numeric'
                            onChangeText={
                                (text) => setNewPrice(text)
                            }
                        >
                        </TextInput>
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
                                onPress={handleUpdate}
                                buttonStyle={{
                                    width: '60%',
                                }}
                            >
                            </Button>
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default EditModal
