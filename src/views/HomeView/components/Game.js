import React from 'react';
import { Text } from 'react-native'
import styles from '../styles';

export default function Game({item}) {
    const onGamePress = (game) => {
        alert('Id : ' + game.id + ' Name : ' + game.data().name);
    };

    return (
        <Text 
            style={styles.itemStyle} 
            onPress={() => onGamePress(item)}>
                {item.data().name}
        </Text>
    );
}