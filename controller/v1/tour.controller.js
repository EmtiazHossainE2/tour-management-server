const Tours = require('../../model/tours.schema.js');

// Get All Tours
exports.getAllTours = async (req, res, next) => {
  const tours = await Tours.find()
  res.status(200).json({
    success: true,
    tours
  })
};

//Create a tours
exports.createTour = async (req, res, next) => {
  const data = req.body;
  const tour = new Tours(data);
  const result = await tour.save();

  if (!result._id) {
    return res.status(500).json({ success: false, error: 'internal error' });
  }
  res.status(201).json({ success: true, message: 'Tour Created' });
};

// Get cheapest tours
exports.getCheapest = async (req, res, next) => {
  const cheapest = await Tours.find().sort('price').limit(3);
  res
    .status(200)
    .json({ success: true, message: 'cheapest tours price', data: cheapest });
};

// Get a tour by id
exports.getOneTourById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Tours.findById(id);
  const incViewCont = await Tours.updateOne(
    { _id: id },
    { $inc: { viewCount: 1 } }
  );
  if (!result || !isValidObjectId(id) || !incViewCont.acknowledged) {
    return res.status(400).json({ success: false, message: 'no data found' });
  }
  res
    .status(200)
    .json({ success: true, message: 'get tour details by id', data: result });
};

// Get all trending tours
exports.getTrending = async (req, res, next) => {
  const trending = await Tours.find({}).sort('-viewCount').limit(3);
  if (!trending || trending.length === 0) {
    return next(new ErrorResponse(`No data found`, 404));
  }
  res
    .status(200)
    .json({ success: true, message: 'Trending tours', data: trending });
};

// Update tours service
exports.updateById = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const result = await Tours.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );

  if (!result.acknowledged || !isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'no data updated' });
  }
  res.status(200).json({ success: true, message: 'tour updated' });
};
