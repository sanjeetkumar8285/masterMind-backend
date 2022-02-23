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


//PropertyType crud
router.post("/propertyType",auth,propertyTypeController.addPropertyType)
router.get("/propertyType",auth,propertyTypeController.getPropertyType)
router.put("/propertyType/:id",auth,propertyTypeController.updatePropertyType)
router.delete("/propertyType/:id",auth,propertyTypeController.deletePropertyType)

//propertyStatus crud
router.post("/propertyStatus",auth,propertyStatusController.addPropertyStatus)
router.get("/propertyStatus",auth,propertyStatusController.getPropertyStatus)
router.put("/propertyStatus/:id",auth,propertyStatusController.updatePropertyStatus)
router.delete("/propertyStatus/:id",auth,propertyStatusController.deletePropertyStatus)

//amenities crud
router.post("/amenities",auth,amenitiesController.addAmenities)
router.get("/amenities",auth,amenitiesController.getAmenities)
router.put("/amenities/:id",auth,amenitiesController.updateAmenities)
router.delete("/amenities/:id",auth,amenitiesController.deleteAmenities)

//Blog crud 
router.post("/blog",auth,upload.single("image"),blogController.addBlog)
router.get("/blog",auth,blogController.getBlog)
router.put("/blog/:id",auth,upload.single("image"),blogController.updateBlog)
router.delete("/blog/:id",auth,blogController.deleteBlog)

router.post("/adminRegister",adminController.adminRegister)
router.post("/adminLogin",adminController.adminLogin)


module.exports=router
