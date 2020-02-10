require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5e3c54ded5ccd37201678d56')
//   .then(task => {
//     console.log(task);

//     return Task.countDocuments({completed: false});
//   })
//   .then(result => {
//     console.log(result);
//   }).catch(console.error();
// 	)

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id, {
    completed
  });
  const count = await Task.countDocuments({completed});

  return count;
};

deleteTaskAndCount('5e3c54b929e07471a3e527b3', false)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
