import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles';
import { firebase } from '../../../firebase/config'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function LoginButton(props) {
    const onLoginPress = () => {
        const auth = getAuth(firebase);
        const firestore = getFirestore(firebase);
        signInWithEmailAndPassword(auth, props.email, props.password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = doc(firestore, 'users', uid);
                getDoc(usersRef)
                    .then((firestoreDocument) => {
                        if (!firestoreDocument.exists) {
                            alert ("User does not exist.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        props.navigation.navigate('Home', {user: user})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}>
            <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
    )
}