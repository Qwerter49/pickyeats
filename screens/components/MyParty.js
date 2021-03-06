import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../styles/Colors'
import { Button, Avatar } from 'react-native-elements'
import MatchedRestaurants from './MatchedRestaurants'
import { BACKEND_URL } from '../../env.config'

export default function MyParty({ assignRestaurant }) {

    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loggedInUser)
    const activeParty = useSelector(state => state.activeParty)
    const partyUsers = useSelector(state => state.partyUsers)
    const matchedRestaurants = useSelector(state => state.matchedRestaurants)

    const displayUserAvatars = () => {
        return partyUsers.map((user,index) => {
            const splitName = user.name.split(' ')
            const initials = splitName.map(name => name[0]).join('')

            return (
                <Avatar
                    key={index}
                    size="medium"
                    rounded
                    title={initials}
                    activeOpacity={0.7}
                    containerStyle={styles.avatar}
                    titleStyle={{color: Colors.darkOrange}}
                />
            )
        })
    }

    const removeActiveParty = (userID) => {
        fetch(`${BACKEND_URL}/users/${userID}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({active_party: null})
        })
    }

    const endPartyForUsers = () => {
        removeActiveParty(loggedInUser.id)

        partyUsers.forEach(user => {
            removeActiveParty(user.id)
        })
    }

    const deactivateParty = () => {
        fetch(`${BACKEND_URL}/parties/${activeParty.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({active: false})
        }).then(dispatch({ type: 'END_PARTY' }))
    }

    const endParty = () => {
        deactivateParty()
        dispatch({ type: 'NEW_PARTY' })
        endPartyForUsers()
    }

    return (
        <>
        <View style={styles.body}>
            <Text style={styles.heading}>{activeParty.title}</Text>
            <Text style={styles.subtext}>In This Party:</Text>
            <View style={styles.avatarList}>{displayUserAvatars()}</View>
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='VIEW RESTAURANTS' onPress={assignRestaurant} />
            { matchedRestaurants.length > 0 ? <MatchedRestaurants /> : <Text style={styles.subtext}>No matches yet!</Text> }
            <Button buttonStyle={styles.endButton} titleStyle={{color: Colors.burgundy, ...styles.buttonText}} type='outline' title='END PARTY' onPress={endParty} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.orange,
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        width: 350,
        alignItems: 'center',
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
        paddingHorizontal: 10,
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
        marginHorizontal: 25,
        marginBottom: 25
    },
    endButton: {
        borderColor: Colors.burgundy,
        borderWidth: 1,
        marginHorizontal: 25,
        marginBottom: 25
    },
    buttonText: {
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    },
    avatarList: {
        flexDirection: 'row',
        marginBottom: 10
    },
    avatar: {
        backgroundColor: Colors.white,
        borderColor: Colors.orange,
        borderWidth: 1,
        marginHorizontal: -3,
    }
})