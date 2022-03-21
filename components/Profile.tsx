import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Caption, Headline, Paragraph } from 'react-native-paper';
import { getRole } from '../enums/Role';
import { useApp } from '../providers/AppProvider';

export default function Profile({ navigation }: any) {
  const { user } = useApp();

  return (
    <View style={styles.container}>
      <Avatar.Icon style={styles.icon} size={120} icon="account" color="#808080" />
      <Headline>{user.name}</Headline>

      <View style={styles.section}>
        <Caption style={styles.centerText}>Role</Caption>
        <Paragraph style={styles.centerText}>{getRole(user.role_id).name}</Paragraph>
      </View>

      <View style={styles.section}>
        <Caption style={styles.centerText}>Contact Number</Caption>
        <Paragraph style={styles.centerText}>{user.contact_number || '-'}</Paragraph>
      </View>

      <View style={styles.section}>
        <Caption style={styles.centerText}>Email</Caption>
        <Paragraph style={styles.centerText}>{user.email || '-'}</Paragraph>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    backgroundColor: "#FFF",
    padding: 30,
  },
  icon: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fafafa",
    borderColor: '#f8f8f8',
    borderWidth: 2,
  },
  section: {
    textAlign: 'center',
    marginTop: 15,
  },
  centerText: {
    textAlign: 'center',
  },
});
