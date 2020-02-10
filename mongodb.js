// CRUD create read update delete
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  }

  console.log('Connected correctly!');
  const db = client.db(databaseName);
  // -----------Delete document----------------
  // db.collection('users')
  //   .deleteMany({
  //     age: 30
  //   })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(error => console.log(error));

  db.collection('tasks')
    .deleteOne({
      description: 'Clean the house'
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });

  // -------------Update document---------------
  // db.collection('users')
  //   .updateOne(
  //     {
  //       _id: new ObjectID('5e3b392c5cbc8376d470ba42')
  //     },
  //     // Datos a cambiar del documento
  //     {
  //       // $set: {
  //       //   name: 'Sarah'
  //       // }

  //       // Increment

  //       $inc: {
  //         age: 1
  //       }
  //     }
  //   )
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  // db.collection('tasks')
  //   .updateMany(
  //     {
  //       completed: true
  //     },
  //     {
  //       $set: {
  //         completed: false
  //       }
  //     }
  //   )
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(error => console.error());

  // ------------Create document-----------------
  // db.collection('users').insertOne(
  //   {
  //     _id: id,
  //     name: 'Angel',
  //     age: 30
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert data');
  //     }

  //     console.log(result.ops);
  //   }
  // );

  // db.collection('users').insertMany(
  //   [
  //     {
  //       name: 'Esteban',
  //       age: 55
  //     },
  //     {
  //       name: 'Johanna',
  //       age: 35
  //     }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert data');
  //     }

  //     console.log(result.ops);
  //   }
  // );

  // db.collection('tasks').insertMany(
  //   [
  //     {
  //       description: 'Clean the house',
  //       completed: true
  //     },
  //     {
  //       description: 'Review inspection',
  //       completed: false
  //     },
  //     {
  //       description: 'Pot plants',
  //       completed: false
  //     }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert tasks');
  //     }

  //     console.log(result.ops);
  //   }
  // );
});
