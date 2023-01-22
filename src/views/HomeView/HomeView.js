import React, {useState, useEffect} from 'react';
import { Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, onSnapshot, query, where } from "firebase/firestore";

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
        else {

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
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const GameView = ({item}) => {
        return (
            <Text style={styles.itemStyle} onPress={() => onGamePress(item)}>{item.data().name}</Text>
        );
    };
    
    const GameSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    };

    const onGamePress = (game) => {
        alert('Id : ' + game.id + ' Name : ' + game.data().name);
    };

    const onLogoutPress = () => {
        signOut(auth);
    }
    
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
                    ItemSeparatorComponent={GameSeparatorView}
                    renderItem={GameView}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}