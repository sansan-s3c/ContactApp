import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Avatar, Button, Overlay} from 'react-native-elements';
import {delContact, putContact} from '../services/ContactServices';
import ActionType from '../redux/actions/ActionType';
import {launchImageLibrary} from 'react-native-image-picker';
import ModalSucces from '../components/ModalSucces';

function ContactsDetail(props) {
  const {firstName, lastName, age, photo, id} = props.contactDetail;
  const [path, setPath] = React.useState(false);
  const deleteContact = async () => {
      await props.setLoading(true)
      const del = await delContact(id)
      await props.setLoading(false)
  }
  const updateContact = async () => {
    props.setLoading(true);
    const body = {
      firstName,
      lastName,
      age,
      photo,
    };
    const put = await putContact(id, JSON.stringify(body));
    if (put == 'Success!') {
      props.setModal(true);
      props.setLoading(false);
      setTimeout(function () {
        props.setRefresh(true);
        props.setModal(false);
        props.navigation.navigate('Contact');
      }, 1500);
    }
  };
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
        <Avatar
          rounded
          avatarStyle={{alignSelf: 'center', justifyContent: 'center'}}
          ImageComponent={() => (
            <Image source={{uri: path.uri}} style={{width: 150, height: 150}} />
          )}
          containerStyle={{
            borderColor: 'black',
            borderWidth: 0.5,
            alignSelf: 'center',
          }}
          size="xlarge"
        />
      );
    } else {
      return (
        <Avatar
          rounded
          title={firstName.charAt(0)}
          source={{uri: photo}}
          avatarStyle={{
            alignSelf: 'center',
            justifyContent: 'center',
            height: 150,
            width: 150,
          }}
          containerStyle={{
            borderColor: 'black',
            borderWidth: 0.5,
            alignSelf: 'center',
          }}
          size="xlarge"
        />
      );
    }
  };
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          margin: 10,
          padding: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        {renderPhoto()}
        {props.isEdit && (
          <Button
            title="Update Photo"
            type="clear"
            containerStyle={{
              height: 40,
              width: 150,
              borderRadius: 0,
              alignSelf: 'center',
            }}
            onPress={() => handleGetPhoto()}
          />
        )}
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={e => props.setFirstName(e)}
          disabled={props.isEdit ? false : true}
          disabledInputStyle={{opacity: 1}}
          inputStyle={styles.inputStyle}
          containerStyle={styles.containerStyle}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={e => props.setLastName(e)}
          disabled={props.isEdit ? false : true}
          inputStyle={styles.inputStyle}
          disabledInputStyle={{opacity: 1}}
          containerStyle={styles.containerStyle}
        />
        <Input
          placeholder="Age"
          value={`${age}`}
          onChangeText={e => props.setAge(e)}
          disabled={props.isEdit ? false : true}
          disabledInputStyle={{opacity: 1}}
          keyboardType="numeric"
          inputStyle={styles.inputStyle}
        />
      </View>
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        {props.isEdit ? (
          <Button
            title="DONE"
            loading={props.isLoading}
            buttonStyle={{backgroundColor: '#2089dc'}}
            containerStyle={{borderRadius: 0, elevation: 5}}
            onPress={() => updateContact()}
          />
        ) : (
          <Button
            title="DELETE"
            // loading={props.isLoading}
            disabled
            buttonStyle={{backgroundColor: '#cf0000'}}
            containerStyle={{borderRadius: 0, elevation: 5}}
            onPress={()=> deleteContact()}
          />
        )}
      </View>
      <ModalSucces visible={props.isSuccess} />
    </>
  );
}

const styles = StyleSheet.create({
  inputStyle: {fontSize: 17},
  containerStyle: {height: 50},
});

const mapStateToProps = state => {
  return {
    contactDetail: state.contactDetail,
    isEdit: state.isEdit,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFirstName: payload =>
      dispatch({type: ActionType.SET_FIRST_NAME, payload}),
    setLastName: payload => dispatch({type: ActionType.SET_LAST_NAME, payload}),
    setAge: payload => dispatch({type: ActionType.SET_AGE, payload}),
    setModal: payload => dispatch({type: ActionType.SET_MODAL, payload}),
    setRefresh: payload => dispatch({type: ActionType.SET_REFRESH, payload}),
    setLoading: payload => dispatch({type: ActionType.SET_LOADING, payload}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsDetail);
