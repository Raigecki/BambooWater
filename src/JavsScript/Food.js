 function createUniqueID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function createFood(name, icon, value, units, information ) {

    var uniqueID = createUniqueID();
    var db = firebase.firestore();
    db.collection("Foods").doc(uniqueID).set({
        name: name,
        icon: icon,
        value: value,
        units: units,
        information: information,
        ID: uniqueID
    })
    .then(function () {
        console.log("Food successfully added");
    })
    .catch(function (error) {
        console.log("Error: ", error);
    });
    
}

function getFoods(name) {
    db.collection("Foods").where("name", "==", name)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function editFood(id, name, icon, amount, units, information ) {

    var db = firebase.firestore();
    db.collection('Foods').doc(id).set({
        name: name,
        icon: icon,
        amount: amount,
        units: units,
        information: information
    }, {merge: true})
    .then(function() {
        console.log("Food Successfully updated");
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
}

function deleteFood(id) {
    db = firebase.firestore();
    db.collection("Foods").doc(id).delete().then(function() {
        console.log("Food successfully deleted!");
    }).catch(function(error) {
        console.error("Error: ", error);
    });
}