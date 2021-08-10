const express = require('express');
const router=express.Router();
const userController=require('../controllers/userController');


//create find update delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/add-user', userController.form);
router.post('/add-user', userController.create);
router.get('/edit-user/:id', userController.edit);
router.post('/edit-user/:id', userController.update);
router.get('/:id', userController.delete);
router.get('/view-user/:id', userController.view_user);
//Count the number
router.get('/count', userController.count);

module.exports = router;