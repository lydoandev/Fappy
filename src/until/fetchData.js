import firebase from 'react-native-firebase'

export default async function fetchData(name) {
    const ref = firebase.database().ref(name)
    let data = [];
    await ref.on('child_added', snapshot => {
        data.push({...snapshot.val(), id: snapshot.key})
    })

    return data
}

