import database from '@react-native-firebase/database';

export default async function fetchData(name) {
    const ref = database().ref(name)
    let data = [];
    await ref.on('child_added', snapshot => {
        data.push({...snapshot.val(), id: snapshot.key})
    })

    return data
}

