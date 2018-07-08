 function createUniqueID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function Food(name, icon, fiber, units, information) {
    this.name = name;
    this.icon = icon;
    this.fiber = fiber;
    this.information = information;
    this.id = '';

    return foodObj;
}

function createFood(name, icon, fiber, units, information ) {

    var uniqueID = createUniqueID();
    var food = new Food(name, icon, fiber, units, information);
    food.id = uniqueID;
    
    var db = firebase.firestore();
    db.collection("Foods").doc(uniqueID).set({
        food: food
    })
    .then(function () {
        console.log("Food successfully added");
    })
    .catch(function (error) {
        console.log("Error: ", error);
    });
    
}

function getFoods(name) {

    var foodList = [];
    db.collection("Foods").where("name", "==", name)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            foodList.push(doc.data());
        });
    })
    .then(function() {
        console.log(foodList);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function editFood(id, name, icon, fiber, units, information ) {

    var db = firebase.firestore();
    db.collection('Foods').doc(id).set({
        name: name,
        icon: icon,
        fiber: fiber,
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