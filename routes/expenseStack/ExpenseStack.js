import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ExpenseList from './../../screens/main/expense/ExpenseList';
import ExpenseCategory from './../../screens/main/expense/ExpenseCategory'

const Tab = createMaterialTopTabNavigator();

export const ExpenseStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
              // focus -> black
                "tabBarActiveTintColor": "black",
                "tabBarLabelStyle": {
                  "fontSize": 14,
                }
              }}
        >
            <Tab.Screen name="Khoản thu" component={ExpenseList} />
            <Tab.Screen name="Loại thu" component={ExpenseCategory} />
        </Tab.Navigator>
    );
}