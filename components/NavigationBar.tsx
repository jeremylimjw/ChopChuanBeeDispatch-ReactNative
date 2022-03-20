import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useApp } from '../providers/AppProvider';

export default function NavigationBar({ navigation, back, options }: any) {
  const { logout  } = useApp();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}

      <Appbar.Content title={options.headerTitle} />

      {!options.hideProfile && 
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="account" onPress={openMenu} />
          }>
          <Menu.Item onPress={() => { navigation.navigate('profile'); setVisible(false) }} title="My profile" />
          <Menu.Item onPress={logout} title="Logout" />
        </Menu>
      }

    </Appbar.Header>
  );
}
