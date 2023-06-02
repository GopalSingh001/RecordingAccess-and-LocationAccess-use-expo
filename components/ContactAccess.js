import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';


export default function ContactAccess() {
  let [error, setError] = useState(undefined);
  let [contacts, setContacts] = useState(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Birthday, Contacts.Fields.Emails, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          setContacts(data);
        } else {
          setError("No contacts found");
        }
      } else {
        setError("Permission to access contacts denied.");
      }
    })();
  }, []);

  let getContactData = (data, property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text>{data.label}: {data[property]}</Text>
          </View>
        )

      });
    }
  }

  let getContactRows = () => {
    if (contacts !== undefined) {
      return contacts.map((contact, index) => {
        return (
          <View key={index} style={styles.contact}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 20 ,fontWeight:'bold'}}>Name: {contact.firstName} {contact.lastName}</Text>
            <Text>   {getContactData(contact.phoneNumbers,"number")} ...
              {getContactData(contact.emails, "email")}</Text>
               
          </View>
        );
      });
    } else {
      return <Text>Awaiting contacts...</Text>
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        {getContactRows()}
      </ScrollView>


      <Text>{error}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    marginVertical: 8,
    backgroundColor: '#daf2d6',
    alignItems:'center'


  }
});