import firebase from 'react-native-firebase'


export default async function getCommentBySeller(id) {
    var refComments = await firebase.database().ref("comments").orderByChild('sellerId')
        .equalTo(id).once('value')
        .then(snapshot => {
            if (snapshot.val() != null) {
                return snapshot.val()
            }
        })
        var comments = [];
        var keys = Object.keys(refComments);
        keys.map(key => {
           comments.push({...refComments[key], id: key})
        })    
    return comments.filter(comment => comment != null);
}