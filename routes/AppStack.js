import * as React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerToggleButton } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ExpenseList from '../screens/main/expense/ExpenseList';
import RevenueList from '../screens/main/revenue/RevenueList';
import InforScreen from '../screens/main/infor/AdditionalInfor';

import { useAuth } from '../context/authContext';
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const auth = useAuth();
    return (
        <DrawerContentScrollView
            {...props}
            style={{}}
        >
            <DrawerItemList {...props} />
            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    marginVertical: 10,
                    width: '80%',
                    alignSelf: 'center',
                }}
            />


            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 18,
                    marginVertical: 10,
                }}
            >
                <Icon name="book" size={24} color="grey" />
                <Text style={{
                    alignSelf: 'center',
                    color: 'grey',
                    fontSize: 14,
                    paddingLeft: 32,
                    fontWeight:'600'
                }}>
                    Thông tin người dùng
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    marginHorizontal: 18,
                    marginVertical: 10,
                }}
            >
                <Text style={{
                    alignSelf: 'center',
                    color: 'grey',
                    fontSize: 15,
                    fontStyle: 'italic',
                }}>
                    {auth.user.userName}
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    marginHorizontal: 18,
                    marginVertical: 10,
                }}
            >
                <Text style={{
                    alignSelf: 'center',
                    color: 'grey',
                    fontSize: 15,
                    fontStyle: 'italic',
                }}>
                    {auth.user.email}
                </Text>
            </View>

            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    marginVertical: 5,
                    width: '80%',
                    alignSelf: 'center',
                    marginTop: 10
                }}
            />

            <DrawerItem
                icon={() => (
                    <Icon name="logout" size={24} color="grey" />
                )}
                label="Đăng xuất"
                // exit app 
                onPress={() => { auth.setUser(null) }}
            />

        </DrawerContentScrollView>
    );
}
export const AppStack = () => {
    // refresh key to refresh the screen
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const handleRefresh = () => {
        setLoading(true);
        // wait for random time to simulate loading
        setTimeout(() => {
            setRefreshKey(prevKey => prevKey + 1);
            setLoading(false);
        }, Math.floor(Math.random() * 1000) + 500);
    }

    const auth = useAuth();
    const dimensions = useWindowDimensions();
    return (
        <NavigationContainer
            independent={true}
        >
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerType: dimensions.width >= 768 ? 'permanent' : 'back',
                    swipeEdgeWidth: 120,
                    // from left to right
                    drawerPosition: 'right',
                    // hamburger on the right
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                handleRefresh();
                            }}
                            style={{ marginLeft: 16 }}
                        >
                            {
                                loading ?
                                    <ActivityIndicator size="small" color="grey" style={{ paddingLeft: 2 }} />
                                    :
                                    <Icon name="refresh" size={24} color="grey" />
                            }
                        </TouchableOpacity>
                    ),
                    headerRight: () => <DrawerToggleButton />,
                    // center the header text
                    headerTitleAlign: 'center',
                    drawerStyle: {
                        flex: 1,
                        height: "100%",
                        paddingTop: 15,
                    }
                }}
            >
                <Drawer.Screen
                    name={"Quản lý khoản thu"}
                    options={{
                        drawerIcon: () => (
                            <Icon name="money" size={24} color="grey" />
                        ),
                        style: {
                            backgroundColor: 'red',
                        }
                    }}
                >
                    {
                        (props) => (
                            <RevenueList refreshKey={refreshKey} />
                        )
                    }
                </Drawer.Screen>
                <Drawer.Screen
                    name="Quản lý khoản tiêu dùng"
                    options={{
                        drawerIcon: () => (
                            <Icon name="code" size={24} color="grey" />
                        )
                    }}
                >
                    {
                        (props) => (
                            <ExpenseList refreshKey={refreshKey} />
                        )
                    }
                </Drawer.Screen>
                <Drawer.Screen
                    name="Thống kê"
                    options={{
                        drawerIcon: () => (
                            <Icon name="camera" size={24} color="grey" />
                        )
                    }}
                >
                    {
                        (props) => (
                            <InforScreen refreshKey={refreshKey} />
                        )
                    }
                </Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}