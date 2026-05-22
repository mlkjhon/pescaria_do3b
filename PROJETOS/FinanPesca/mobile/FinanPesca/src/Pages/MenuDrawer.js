import { createDrawerNavigator } from '@react-navigation/drawer';
import Principal from './Principal'

const Drawer = createDrawerNavigator();
export default function MenuDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Principal" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Principal" component={Principal} />
    </Drawer.Navigator>
  )
}