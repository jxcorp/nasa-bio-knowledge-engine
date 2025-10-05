const express = require("express");
const {
  getAllDatasets,
  proxyDatasetRequest,
  searchOsdrData,
  searchOsdrDetails,
} = require("../controller/DatasetController");

const router = express.Router();

// Route for all datasets
router.get("/datasets", getAllDatasets);

// Route for any dataset subpath
router.use("/dataset", proxyDatasetRequest);
router.get("/datasets/search", searchOsdrData);
 router.use("/osdr/data/osd",searchOsdrDetails)
 
// 🌟 NEW ROUTE ADDED HERE
module.exports = router;
