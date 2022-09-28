const tourController = require('../../controller/v1/tour.controller.js');
const router = require('express').Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getOneTourById)
  .patch(tourController.updateById);

router.route('/trending').get(tourController.getTrending);
router.route('/cheapest').get(tourController.getCheapest);

module.exports = router;
