import firebase from 'react-native-firebase'

export default function fetchData(name) {
    const ref = firebase.database().ref("users")
    let data = [];
    ref.on('child_added', snapshot => {
        console.log("Value: ", snapshot.val());
        
        data.push(snapshot.val())
    })
    console.log("Data: ", data);
    
    return data
}