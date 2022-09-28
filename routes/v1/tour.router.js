const express = require('express');
const tourController = require('../../controller/v1/tour.controller.js');

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getOneTourById)
  .patch(tourController.updateById);


module.exports = router;
