import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Avatar, Button, Overlay} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import ActionType from '../redux/actions/ActionType';
import {postContact} from '../services/ContactServices';

function AddContact(props) {
  const [path, setPath] = React.useState(false);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const handleGetPhoto = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      setPath(response);
    });
  };
  const renderPhoto = () => {
    if (path) {
      return (
        <Image source={{uri: path.uri}} style={{width: 150, height: 150}} />
      );
    } else {
      return (
        <Image
          source={require('../asset/user.jpg')}
          style={{width: 150, height: 150}}
        />
      );
    }
  };

  React.useEffect(() => {
    if (firstName && lastName && age) {
      props.navigation.setOptions({
        headerRight: () => (
          <Button
            title="Done"
            type="clear"
            disabled={false}
            titleStyle={{fontSize: 15}}
            onPress={() => pushContact()}
          />
        ),
      });
    }
  }, [firstName, lastName, age]);
  const pushContact = async () => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    const push = await postContact(JSON.stringify(body));
    if (push == 'Success!') {
      setModal(true);
      setTimeout(function () {
        setModal(false);
        props.setRefresh(true);
        props.navigation.navigate('Contact');
      }, 1500);
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        elevation:5
      }}>
      <Avatar
        rounded
        avatarStyle={{alignSelf: 'center', justifyContent: 'center'}}
        ImageComponent={() => renderPhoto()}
        containerStyle={{
          borderColor: 'black',
          borderWidth: 0.5,
          alignSelf: 'center',
        }}
        size="xlarge"
      />
      <Button
        title="Add Photo"
        type="clear"
        containerStyle={{
          height: 40,
          width: 100,
          borderRadius: 0,
          alignSelf: 'center',
        }}
        onPress={() => handleGetPhoto()}
      />
      <Input
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
      />
      <Input
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        inputStyle={styles.inputStyle}
      />

      <Overlay
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
        overlayStyle={{
          borderRadius: 20,
          bottom: 30,
          position: 'absolute',
          width: 100,
        }}>
        <Text style={{alignSelf: 'center'}}>Success!</Text>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {fontSize: 15},
  containerStyle: {height: 50},
});

const mapStateToProps = state => {
  return {
    isSave: state.isSave,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRefresh: payload => dispatch({type: ActionType.SET_REFRESH, payload}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
