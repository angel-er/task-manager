const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// const multer = require('multer');
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
//       // if (!file.originalname.endsWith('.pdf')) {
//       return cb(new Error('File must be a file with the extenxions provided.'));
//     }
//     cb(undefined, true);
//     // cb(new Error('File must be a PDF'))
//     // cb(undefined, true)
//     // cb(undefined, false)
//   }
// });
// app.post(
//   '/upload',
//   upload.single('upload'),
//   (req, res) => {
//     res.send('Upload confirmated!');
//   },
//   (error, req, res, next) => {
//     res.status(400).send({error: error.message});
//   }
// );

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//
// Without middleware: new request -> run route handler
//
// With middleware: new request -> do something -> run route handler
//

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});

// const Task = require('./models/task');
// const main = async () => {
//   // const task = await Task.findById('5e3d898800dca066e10ed36a');
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner);

//   const user = await User.findById('5e3d88f600dca066e10ed367');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };

// main();

// ---------- Como esconde el token y el password mongoose ------------------
// const pet = {
//   name: 'Hal'
// };
// pet.toJSON = function() {
//   // console.log(this);
//   return this;
// };
// console.log(JSON.stringify(pet));

// -------------------- JWT ----------------------------
// const jwt = require('jsonwebtoken');
// const myFunctionJWT = async () => {
//   const token = jwt.sign({_id: '1234578'}, 'thisismynewcourse', {
//     expiresIn: '3s'
//   });

//   console.log(token);

//   const data = jwt.verify(token, 'thisismynewcourse');
//   console.log(data);
// };
// myFunctionJWT();

// --------------------- Bcrypt ----------------------------
// const bcrypt = require('bcrypt');

// const myFunctionBcrypt = async () => {
//   const password = 'red12345';
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare('red12345', hashedPassword);
//   console.log(isMatch);
// };

// myFunctionBcrypt();
