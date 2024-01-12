import { StyleSheet, Text, View, Modal, Pressable, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Button } from 'react-native-elements'

import { deleteExpense, deleteRevenue } from '../api/main'


const DeleteModal = (props) => {
    const token = props.token
    const type = props.type
    if (!props.modalVisible) {
        return null
    }
    const handleDelete = async () => {
        try {
            const data = {
                revenueId: null,
                expenseId: null
            }
            if (type === 'expense') {
                data.expenseId = Number(props.expense.id)
                await deleteExpense(data, token)
                    .then((res) => {
                        switch (res.statusCode) {
                            case 200:
                                Alert.alert('Thành công','Xóa khoản tiêu dùng thành công')
                                break;
                            default:
                                Alert.alert('Thất bại','Xóa khoản tiêu dùng thất bại')
                                break;
                        }
                    })
            } else {
                data.revenueId = Number(props.revenue.id)
                await deleteRevenue(data, token)
                    .then((res) => {
                        switch (res.statusCode) {
                            case 200:
                                Alert.alert('Thành công', 'Xóa khoản thu nhập thành công')
                                break;
                            default:
                                Alert.alert('Thất bại', 'Xóa khoản thu nhập thất bại')
                                break;
                        }
                    })
            }
            await props.setModalVisible(false)
            await props.updateData()
        } catch (error) {
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
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        maxWidth: 360,
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
                        Thông tin
                    </Text>
                    <Text style={styles.message}>Bạn chắc chắn muốn xóa ?</Text>
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
                                type: 'outline',
                            }}
                        >
                        </Button>
                        <Button
                            title="Xác nhận"
                            type='solid'
                            onPress={handleDelete}
                            buttonStyle={{
                                width: '60%',
                                backgroundColor: "red"
                            }}
                        >
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DeleteModal

const styles = StyleSheet.create({
    message: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
        flexDirection: 'row',
        alignSelf: 'center',
        fontSize: 16,
    },
})