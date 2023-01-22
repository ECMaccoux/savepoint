import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#0094FF',
        marginTop: 20,
        height: 48,
        width: '80%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
        bottom: 0
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        alignItems: "center",
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})