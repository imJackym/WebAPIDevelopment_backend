// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import upload from '../upload.js'
import { isAuth, isAdmin, generateToken } from '../utils.js';
import { getAllDog, addNewDog, getDogById, updateDogById, search, deleteDogById, filter, uploadimg } from '../controllers/dog.controller.js'

const router = Router({ prefix: '/api/v1/dog' })

router.get('/', getAllDog)
router.get('/filter/:breed([A-Za-z0-9]{1,})', filter)
router.get('/search/:name([A-Za-z0-9]{1,})', search)

router.post('/', bodyParser(), isAuth, isAdmin, addNewDog)
router.post('/upload', isAuth, isAdmin, upload.single('pic'), uploadimg)
router.post('/delete/:id([A-Za-z0-9]{1,})', bodyParser(), isAuth, isAdmin, deleteDogById)

router.get('/:id([A-Za-z0-9]{1,})', getDogById)
router.post('/:id([A-Za-z0-9]{1,})', bodyParser(), isAuth, isAdmin, updateDogById)

export default router