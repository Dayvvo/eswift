import express from 'express'
import propertyController from '../controllers/propertyController'
import { isAdmin, isAuth } from '../utils/middleware'
import favouritePropertyController from '../controllers/favouriteController'

const router = express.Router()

router
  .route('/')
  .post(isAuth, propertyController.createProperty)
  .get(propertyController.getCreatedProperties)

router
  .route('/favourite/:propertyId')
  .post(isAuth, favouritePropertyController.addToFavourites)

router.get('/favourite', favouritePropertyController.getAllFavouriteProperty)

router.delete(
  '/favourite/:id',
  favouritePropertyController.removeFromFavouriteProperty
)

router.get('/props', propertyController.getPropertyDocs)

router.get('/admin', propertyController.adminGetAllProperties)

router
  .route('/:id')
  .get(propertyController.getPropertyById)
  .patch(isAuth, propertyController.updateProperty)
  .delete(isAuth, isAdmin, propertyController.deleteProperty)

router.patch('/:id/freeze', isAuth, propertyController.isActiveSwitch)

router.put('/:id/verify', isAuth, isAdmin, propertyController.verifyProperty)

export default router
