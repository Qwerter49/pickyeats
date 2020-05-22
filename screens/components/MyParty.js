import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../styles/Colors'
import { Button } from 'react-native-elements'

export default function MyParty({ assignRestaurant }) {

    const activeParty = useSelector(state => state.activeParty)

    return (
        <>
        <View style={styles.body}>
            <Text style={styles.heading}>{activeParty.title}</Text>
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='VIEW RESTAURANTS' onPress={assignRestaurant} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.orange,
        margin: 10,
        height: '75%',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    field: {
        width: 280,
        paddingHorizontal: 0,
        borderColor: Colors.darkOrange,
    },
    heading: {
        fontFamily: 'LondrinaShadow-Regular',
        textAlign: 'center',
        fontSize: 56,
        margin: 15,
        width: 350,
        borderRadius: 5,
        color: Colors.burgundy
    },
    title: {
        fontFamily: 'LondrinaShadow-Regular',
        textAlign: 'center',
        fontSize: 48,
        lineHeight: 48,
        color: Colors.black,
        marginBottom: 15
    },
    subtext: {
        fontFamily: 'Raleway-SemiBold',
        textAlign: 'center',
        fontSize: 26,
        color: Colors.burgundy,
        marginBottom: 15
    },
    search: {
        borderColor: Colors.burgundy,
        width: 250,
        borderWidth: 2,
        borderRadius: 100,
        paddingLeft: 10,
        alignContent: 'center',
        fontFamily: 'Raleway-Medium',
        fontSize: 16,
        marginBottom: 20
    },    
    button: {
        backgroundColor: Colors.burgundy,
        marginHorizontal: 50
    },
    buttonText: {
        color: Colors.white,
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    }
})