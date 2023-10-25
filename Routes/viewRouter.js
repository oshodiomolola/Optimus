const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const viewController = require('../controllers/viewsController')



router.get('/', (req, res) => {
    res.status(200).render('intro')
})

router.get('/signUp', (req, res) => {
    res.status(200).render('signUp')
})
router.get('/login', (req, res) => {
    res.status(200).render('login')
})


router.use(authController.isLoggedIn)

router.get('/overview', (req, res) => {
    res.status(200).render('overview')
})
router.get('/stats', viewController.getUserTaskStat)
router.get('/searchQuery', viewController.queryTask)
module.exports = router