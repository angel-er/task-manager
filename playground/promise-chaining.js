require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5e3c51a814b3ea6f8037a056', {age: 50})
//   .then(user => {
//     console.log(user);

//     return User.countDocuments({age: 50});
//   })
//   .then(result => {
//     console.log(result);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {age});
  const count = await User.countDocuments({age});

  return count;
};

updateAgeAndCount('5e3c51a814b3ea6f8037a056', 2)
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
