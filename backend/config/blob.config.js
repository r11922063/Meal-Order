import multer from 'multer';

const meal_img_destination = '../frontend2/src/assets/meal_imgs';
const meal_img_storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, meal_img_destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + "hi.png");
    }
});
const meal_img_upload = multer({ storage: meal_img_storage });


export const blob_config = {
    MEAL_IMG_DESTINATION: meal_img_destination,
    MEAL_IMG_UPLOAD: meal_img_upload,
};