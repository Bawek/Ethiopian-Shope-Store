const express = require('express');
const { registerAccount, getAllAccounts, login, deleteAccountById, logout, updateById, updateAccount, getAccountAndLocation, passwordReset, changePassword } = require('../controllers/account.controller');
const upload = require('../config/multer.config');
const resetAuth = require('../middlewares/restAuth');
const router = express.Router()
// Account routes 
router.post('/register', registerAccount)
router.post('/login', login)
router.post('/logout', logout)
router.post('/update-role/:accountId', updateById)
router.post('/update/:accountId', upload.single('profileImage'), updateAccount)
router.delete('/delete/:accountId', deleteAccountById)
router.get('/get-all', getAllAccounts)
router.get('/get-account-location/:id', getAccountAndLocation)
router.post('/require-change/:email', passwordReset)
router.post('/password-change/:token', resetAuth, changePassword)
module.exports = router 
