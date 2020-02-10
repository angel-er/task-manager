const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }

  // user
  //   .save()
  //   .then(user => {
  //     console.log(user);
  //     res.status(201).send(user);
  //   })
  //   .catch(error => {
  //     res.status(400).send(error);
  //     console.log(error);
  //   });
});

router.post('/users/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    console.log(user);
    console.log(token);
    res.send({user, token});
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }

  // User.find({})
  //   .then(users => {
  //     res.send(users);
  //   })
  //   .catch(e => {
  //     res.status(500).send();
  //   });
});

router.get('/users/me', authMiddleware, (req, res) => {
  res.send(req.user);
});

// router.get('/users/:id', authMiddleware, async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(404).send();
//   }
//   // User.findById(_id)
//   //   .then(user => {
//   //     if (!user) {
//   //       return res.status(404).send();
//   //     }

//   //     res.send(user);
//   //   })
//   //   .catch(error => {
//   //     res.status(500).send();
//   //   });
// });

router.patch('/users/me', authMiddleware, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    // const user = await User.findById(_id);

    updates.forEach(update => (req.user[update] = req.body[update]));
    // updates.forEach(update => (user[update] = req.body[update]));
    await req.user.save();
    // await user.save();

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    // if (!user) {
    //   res.status(404).send();
    // }

    res.send(req.user);
    // res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', authMiddleware, async (req, res) => {
  // const _id = req.params.id;
  try {
    await req.user.remove();
    // const user = await User.findByIdAndDelete(_id);

    // if (!user) {
    //   res.status(404).send();
    // }

    res.send(req.user);
    // res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  // dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx|jpg|jpeg)$/)) {
      // if (!file.originalname.endsWith('.pdf')) {
      return cb(new Error('File must be a file with the extenxion provided.'));
    }
    cb(undefined, true);
  }
});

router.post(
  '/users/me/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({error: error.message});
  }
);

router.delete('/users/me/avatar', authMiddleware, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

module.exports = router;
