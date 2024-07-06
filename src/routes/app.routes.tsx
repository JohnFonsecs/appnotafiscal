import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";

import { MaterialIcons } from '@expo/vector-icons';

import { Dashboard } from "../pages/Dashboard";
import { ListExpenses } from "../pages/ListExpenses";
import { Resume } from "../pages/Resume";

type AppRoutes = {
  dashboard: undefined;
  listExpenses: undefined;
  resume: undefined;
}

export type AppNavigationRoutesProps =
  BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } =
  createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
      tabBarLabelPosition: 'below-icon',
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'purple',
      tabBarStyle: {
        height: 88
      }
    }}>
      <Screen
        name='dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='post-add'
              size={size}
              color={color}

            />
          )
        }}
      />
      <Screen
        name='listExpenses'
        component={ListExpenses}
        options={{
          tabBarLabel: 'List Expenses',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name='resume'
        component={Resume}
        options={{
          tabBarLabel: 'Resume',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='library-books'
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}