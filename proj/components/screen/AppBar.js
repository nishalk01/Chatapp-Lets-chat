import  React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header dark={false}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content  title="Let's Chat"  />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default AppBar;