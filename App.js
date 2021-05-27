import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import contactReducer from './src/redux/reducer/ContactReducer';

import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFoundation from 'react-native-vector-icons/Ionicons';

import Contacts from './src/screens/Contacts';
import ContactsDetail from './src/screens/ContactsDetail';
import AddContact from './src/screens/AddContact';
import ActionType from './src/redux/actions/ActionType';

const Stack = createStackNavigator();
const store = createStore(contactReducer);

export default function App() {
  const [isSave, setIsSave] = React.useState(false);

  const setSave = payload => {
    setIsSave(true);
  };
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Contact"
              component={Contacts}
              options={({navigation}) => ({
                headerShown: true,
                headerTintColor: '#fff',
                headerStyle: styles.headerStyle,
                headerTitleStyle: {fontSize: 15, fontWeight: '100'},
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="plus" size={20} color="white" />}
                    onPress={() => navigation.navigate('AddContact')}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ContactDetail"
              component={ContactsDetail}
              options={({navigation}) => ({
                headerTitle: 'Contact Detail',
                headerShown: true,
                headerTintColor: '#fff',
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.headerTitleStyle,
                headerLeft: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="arrowleft" size={20} color="white" />}
                    onPress={() => {
                      navigation.goBack();
                      store.dispatch({
                        type: ActionType.SET_EDIT,
                        payload: false,
                      });
                    }}
                  />
                ),
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="edit" size={20} color="#2089dc" />}
                    onPress={() =>
                      store.dispatch({type: ActionType.SET_EDIT, payload: true})
                    }
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddContact"
              component={AddContact}
              setSave={setSave}
              options={({navigation}) => ({
                headerTitle: 'Add Contact',
                headerShown: true,
                headerTintColor: '#fff',
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.headerTitleStyle,
                headerLeft: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="arrowleft" size={20} color="white" />}
                    onPress={() => navigation.goBack()}
                  />
                ),
                headerRight: () => (
                  <Button
                    title="Done"
                    type="clear"
                    disabled={true}
                    titleStyle={{fontSize: 15}}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 15,
    fontWeight: '100',
    alignSelf: 'center',
  },
  headerStyle: {
    backgroundColor: '#0a1931',
    elevation: 5,
    shadowOpacity: 1,
  },
});
