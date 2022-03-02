const express=require('express');
const router=express.Router();
const auth=require('../middleware/adminAuth')
const upload=require('../utils/multer');
const propertyController=require("../controller/PropertyController")
const propertyTypeController=require("../controller/propertyTypeController")
const propertyStatusController=require("../controller/propertyStatusController")
const amenitiesController=require("../controller/AmenitiesController");
const adminController=require("../controller/adminAuthController")
const blogController=require("../controller/blogController")
const sellerController=require("../controller/sellerController");
const builderController=require("../controller/builderController")
//Property crud
router.post("/property",auth,upload.fields([
    {
        name:"brochureImage",
        maxCount:1
    },
    {
        name:"images",
        maxCount:20
    },
    {
        name:"mapImage",
        maxCount:1
    }
]),propertyController.addProperty)

router.get('/property',auth,propertyController.getProperty)

router.delete("/property/:id",auth,propertyController.deleteProperty)

router.put("/property/:id",auth,upload.fields([
    {
        name:"brochureImage",
        maxCount:1
    },
    {
        name:"images",
        maxCount:20
    },
    {
        name:"mapImage",
        maxCount:1
    }
]),propertyController.updateProperty)

//search and get All Data route for property Type
router.get("/getProperty",auth,propertyController.searchProperty)

//PropertyType crud
router.post("/propertyType",auth,propertyTypeController.addPropertyType)
router.get("/propertyType",auth,propertyTypeController.getPropertyType) // Pagination route
router.put("/propertyType/:id",auth,propertyTypeController.updatePropertyType)
router.delete("/propertyType/:id",auth,propertyTypeController.deletePropertyType)

//search and get All Data route for property Type
router.get("/getPropertyType",auth,propertyTypeController.searchPropertyType)

//propertyStatus crud
router.post("/propertyStatus",auth,propertyStatusController.addPropertyStatus)
router.get("/propertyStatus",auth,propertyStatusController.getPropertyStatus)
router.put("/propertyStatus/:id",auth,propertyStatusController.updatePropertyStatus)
router.delete("/propertyStatus/:id",auth,propertyStatusController.deletePropertyStatus)

//search and get All Data route for property Status
router.get("/getPropertyStatus",auth,propertyStatusController.searchPropertyStatus)

//amenities crud
router.post("/amenities",auth,upload.single("image"),amenitiesController.addAmenities)
router.get("/amenities",auth,amenitiesController.getAmenities)
router.put("/amenities/:id",auth,upload.single("image"),amenitiesController.updateAmenities)
router.delete("/amenities/:id",auth,amenitiesController.deleteAmenities)
//search and get All Data route for Amenities
router.get("/getAmenities",auth,amenitiesController.searchAmenities)

//Blog crud 
router.post("/blog",auth,upload.single("image"),blogController.addBlog)
router.get("/blog",auth,blogController.getBlog)
router.put("/blog/:id",auth,upload.single("image"),blogController.updateBlog)
router.delete("/blog/:id",auth,blogController.deleteBlog)
//search and get All Data route for Amenities
router.get("/getBlog",auth,blogController.searchBlog)

router.post("/seller",auth,sellerController.addSeller)
router.get("/seller",auth,sellerController.getSeller)
router.put("/seller/:id",auth,sellerController.updateSeller)
router.delete("/seller/:id",auth,sellerController.deleteSeller)
//search and get All Data route for Amenities
router.get("/getSeller",auth,sellerController.searchSeller)

router.post("/builder",auth,builderController.addBuilder)
router.get("/builder",auth,builderController.getBuilder)
router.put("/builder/:id",auth,builderController.updateBuilder)
router.delete("/builder/:id",auth,builderController.deleteBuilder)
//search and get All Data route for Amenities
router.get("/getBuilder",auth,builderController.searchBuilder)


router.post("/adminRegister",adminController.adminRegister)
router.post("/adminLogin",adminController.adminLogin)


module.exports=router
