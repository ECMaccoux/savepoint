import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles';
import { firebase } from '../../../firebase/config'
import { getAuth, signOut } from "firebase/auth";

export default function LogoutButton(props) {
    const auth = getAuth(firebase);

    const onLogoutPress = () => {
        signOut(auth);
    }

    return (
        <View style={styles.bottom}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onLogoutPress()}>
                <Text style={styles.buttonTitle}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}