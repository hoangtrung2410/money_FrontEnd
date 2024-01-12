import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import {Button} from "react-native-elements";

function processTime(time) {
    const [year, month, day] = String(time).split('-')
    return `${day}/${month}/${year}`
}

function processPreciseTime(time) {
    const [dayTime, hourTime] = String(time).split('T')
    const [year, month, day] = String(dayTime).split('-')
    const [hour, minute, second] = String(hourTime).split('.')[0].split(':')
    return `${hour}:${minute}:${second} - ${day}/${month}/${year}`
}

const InforModal = (props) => {
    const [data, setData] = React.useState({})
    useEffect(() => {
        setData(props.expense ? props.expense : props.revenue)
    }, [props])
    
    if (!props.modalVisible) {
        return null
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
                                paddingVertical:10
                            }}
                        >
                            {props.expense ? 'Thông tin khoản chi' : 'Thông tin khoản thu'}
                        </Text>
                        <Text style={styles.message}>Tên: {data.name}</Text>
                        <Text style={styles.message}>Số tiền: {data.price ? data.price : data.amount} VND</Text>
                        <Text style={styles.message}>Thời gian: {processTime(data.time)}</Text>
                        <Text style={styles.message}>Tạo vào lúc: {processPreciseTime(data.createdAt)}</Text>
                      <Button
                        title="Hủy"
                        type="outline"
                        onPress={() => props.setModalVisible(false)}
                        buttonStyle={{
                          width: '30%',
                          alignSelf: 'center',
                          color: '#1D5461',
                          marginBottom: 10,
                        }}
                      >
                      </Button>
                    </View>

                </View>
        </Modal>
    )
}

export default InforModal

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