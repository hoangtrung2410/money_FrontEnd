import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RevenueList from './../../screens/main/revenue/RevenueList';
import RevenueCategory from './../../screens/main/revenue/RevenueCategory'

const Tab = createMaterialTopTabNavigator();

export const RevenueStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="RevenueList" component={RevenueList} />
            <Tab.Screen name="RevenueCategory" component={RevenueCategory} />
        </Tab.Navigator>
    );
}