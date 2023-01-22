import React, {useState, useEffect} from 'react';
import { View, SafeAreaView, FlatList, TextInput} from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot, query, where } from "firebase/firestore";
import LogoutButton from "./components/LogoutButton"
import GameSeparator from './components/GameSeparator';
import Game from './components/Game';

export default function HomeView(props) {
    const auth = getAuth(firebase);
    const firestore = getFirestore(firebase);

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    
    useEffect(() => {
        if (auth.currentUser) {
            const gamesRef = query(collection(firestore, 'games'), where('user', '==', auth.currentUser.uid));
            onSnapshot(gamesRef, (snapshot) => {
                const docs = snapshot.docs;
                setFilteredDataSource(docs);
                setMasterDataSource(docs);
            }, (error) => {})
        }
    }, []);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (game) {
                    const gameName = game.data().name;
                    const gameData = gameName
                        ? gameName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return gameData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } 
        else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search"
                />
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(game, index) => index.toString()}
                    ItemSeparatorComponent={GameSeparator}
                    renderItem={Game}
                />
            </View>
            <LogoutButton></LogoutButton>
        </SafeAreaView>
    )
}