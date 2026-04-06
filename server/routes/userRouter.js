const express = require('express');
const { createUser,loginUser,getUserProfile,updateUserProfile,deleteUser,getAllUsers } = require('../controller/userController');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/get_by_id/:id', getUserProfile);
router.put('/update_user/:id', updateUserProfile);
router.delete('/delete_user/:id', deleteUser);
router.get('/get_all_users', getAllUsers);

module.exports = router;
