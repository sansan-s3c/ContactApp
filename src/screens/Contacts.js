import React, {Fragment} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {
  ListItem,
  Avatar,
  LinearProgress,
  SearchBar,
  Button,
} from 'react-native-elements';
import filter from 'lodash.filter';
import {getContact} from '../services/ContactServices';
import { useIsFocused } from '@react-navigation/native'

import {connect} from 'react-redux';
import ActionType from '../redux/actions/ActionType';

function Contacts(props) {
  const [MasterList, setMasterList] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [keyword, setKeyword] = React.useState(null);
  const isFocused = useIsFocused()

  const contains = (user, query) => {
    console.log(user);
    const {firstName, lastName} = user;
    const name = firstName.toLowerCase() + ' ' + lastName.toLowerCase();
    console.log(name);
    if (name.includes(query)) {
      return true;
    }
    return false;
  };
  const handleSearch = text => {
    setKeyword(text);
    const formattedQuery = text.toLowerCase();
    // console.log(MasterList)
    const data = filter(MasterList, user => {
      return contains(user, formattedQuery);
    });
    setList(data);
  };

  const detailContact = contact => {
    console.log(contact);
    props.setDetailContact(contact);
    props.navigation.navigate('ContactDetail');
  };
  const renderItem = ({item}) => (
    <ListItem bottomDivider={true} onPress={() => detailContact(item)}>
      <Avatar
        rounded
        title={item.firstName.charAt(0)}
        source={{uri: item.photo}}
      />
      <ListItem.Content>
        <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  React.useEffect(() => {
    const fetch = async () => {
      setMasterList([]);
      setList([]);
      await props.setLoading(true)
      const GetContact = await getContact();
      setMasterList(GetContact.data);
      setList(GetContact.data);
      await props.setLoading(false)
    };
    if (isFocused) {
      fetch();
    }
  },[isFocused]);
  return (
    <>
      <SearchBar
        lightTheme
        containerStyle={{
          backgroundColor: 'white',
          borderBottomColor: 'black',
          borderTopColor: 'white',
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{height: 40}}
        inputStyle={{color: 'black', fontSize: 15}}
        placeholderTextColor="black"
        searchIcon={{color: 'black'}}
        round
        placeholder="Search"
        onChangeText={e => handleSearch(e)}
        value={keyword}
      />
      {
        props.isLoading && <LinearProgress color="primary" />
      }
      <FlatList
        // keyExtractor={item.id}
        data={list}
        renderItem={renderItem}
      />
    </>
  );
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDetailContact: payload =>
      dispatch({type: ActionType.SET_CONTACT_DETAIL, payload}),
    setLoading: payload => dispatch({type: ActionType.SET_LOADING, payload})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
