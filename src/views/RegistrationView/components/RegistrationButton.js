import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles';
import { firebase } from '../../../firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function RegistrationButton(props) {
    const fullName = props.fullName;
    const email = props.email;
    const password = props.password;
    const confirmPassword = props.confirmPassword;

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        
        const auth = getAuth(firebase);
        const firestore = getFirestore(firebase);

        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = doc(firestore, 'users', uid);
                setDoc(usersRef, data)
                    .then(() => {
                        props.navigation.navigate('Home', {user: data})
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
            onPress={() => onRegisterPress()}>
            <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
    )
}