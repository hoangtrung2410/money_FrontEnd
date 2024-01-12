import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AdditionalInfor from './../../screens/main/infor/AdditionalInfor';

const Tab = createMaterialTopTabNavigator();

export const InforStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AdditionalInfor" component={AdditionalInfor} />
        </Tab.Navigator>
    );
}