import type { Meal } from '../../type'
import test_img from '../../assets/dumplings.jpg'
import style from '../../style/Meal/AllMealAddMealItem.module.css'
import Counter from '../shared/Counter'
import { BACKEND_URL } from '../../constant'
import { useState } from 'react'
import AddMealButton from './AddMealButton'
import { GrAdd } from "react-icons/gr"
import ImageUploading, { ImageListType, ErrorsType } from 'react-images-uploading';

const addMealOnClick = (vendorId: number, mealName: string, description: string, 
                        price: number, defaultInventory: number, img: any ) => {

  const today = new Date().getDay();
  let inventory: Record<string, number> = {};
  for (let i = 0; i < 3; i++){
    const day = (today-1+i) % 7 + 1;
    inventory[day.toString()] = 0;
  }
  for (let i = 3; i < 7; i++){
    const day = (today-1+i) % 7 + 1;
    inventory[day.toString()] = defaultInventory;
  }

  const newMeal: Meal = {
    Meal_ID: -1,
    Vendor_ID: vendorId,
    Meal_Name: mealName,
    Description: description,
    Price: price,
    Inventory: inventory,
    Image_url: "",
    Default_Inventory: defaultInventory
  };

  const update_url = `${BACKEND_URL}/allMeals/addMealItem`;
  fetch(update_url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newMeal: newMeal, img: img })
  }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

export default function AllMealAddMealItem() {
  const [count, setCount] = useState(0);

  const [image, setImages] = useState<ImageListType>([]);
  const uploadImageOnChange = (imageList: ImageListType, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const uploadImageOnError = (errors: ErrorsType, files: any) => {
    if (errors){
      let errorMessage = errors.maxNumber? "Number of selected images exceed maxNumber" : (
                         errors.acceptType ? "Your selected file type is not allowed" : (
                         errors.maxFileSize ? "Selected file size exceeds maxFileSize" : (
                         errors.resolution ? "Selected file is not match your desired resolution" : 
                          "Some other error occured..."
          )
        )
      );
      alert(errorMessage);
    }
  }

  return (
    <div className={style.addMealItem_item}>
      <div className={style.addMealItem_attributeContainer}>
        <div className={style.addMealItem_mealContainer}>
          <div className={style.addMealItem_contentContainer}>
            <div className={style.addMealItem_title}>
              <input type="text" placeholder="餐點名稱" required>
              </input>
            </div>
          </div>

          <div className={style.addMealItem_otherContainer}>
            <div className={style.addMealItem_counterBox}>
              <div className={style.addMealItem_counter}>
                <Counter count={count} setCount={setCount} />
              </div>
              <div className={style.addMealItem_counterDescription}>預設庫存：</div>
            </div>
          </div>
        </div>

        <div className={style.addMealItem_buttonContainer}>
          <AddMealButton text="新增餐點" onClickFunc={() => {
            addMealOnClick(101, "新", "新餐點", 5, 333, image)
            }}/>
        </div>
      </div>

      <ImageUploading
        multiple={false}
        value={image}
        onChange={uploadImageOnChange}
        onError={(errors, files) => {uploadImageOnError(errors, files)}}
        maxNumber={1}
        dataURLKey="data_url"
        maxFileSize={3000000}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className={style.addMealItem_imgBox} onClick={() => {
            onImageRemoveAll();
            onImageUpload();
          }}>
          {image.length > 0 ?  (
            <img src={image[0]['data_url']} alt="" className={style.addMealItem_img}/>
            ) : (<GrAdd/>)
          }
          </div>
        )}

      </ImageUploading>

      
    </div>
  );
}