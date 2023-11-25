import type { Meal } from '../../type'
import test_img from '../../assets/dumplings.jpg'
import style from '../../style/Meal/AllMealAddMealItem.module.css'
import Counter from '../shared/Counter'
import { BACKEND_URL } from '../../constant'
import { useEffect, useState } from 'react'
import AddMealButton from './AddMealButton'
import MealText from './MealText';
import { GrAdd } from "react-icons/gr"
import ImageUploading, { ImageListType, ErrorsType } from 'react-images-uploading';
import { useParams } from 'react-router-dom'
import { MEAL_IMG_DESTINATION } from '../../constant'

const sendNewMealData = (newMeal: Meal, img: any ) => {
  // let formData = new FormData();
  // formData.append('img', img);
  // formData.append('newMeal', JSON.stringify(newMeal));
  // for (var key of formData.entries()) {
  //   console.log("frontend formData = ", key[0] + ", " + key[1]);
  // }

  const update_url = `${BACKEND_URL}/allMeals/addMealItem`;
  fetch(update_url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({newMeal: newMeal}),
  }).then((res) => res.json())
    .then((data) => {
      const image_url = data.image_url;
      console.log(image_url);
      newMeal.Image_url = image_url;
      // TODO: Add to meals(state)
      // TODO: fetch backend '/uploadMealItemImage'
      
      sendNewMealImage(image_url, img);
    })
    .catch((err) => console.log(err));
}

const sendNewMealImage = (image_url: string, img: File) => {
  const upload_url = `${BACKEND_URL}/allMeals/uploadMealItemImage`;
  let formData = new FormData();
  formData.append('img_url', image_url);
  formData.append('img', img);
  fetch(upload_url, {
    method: 'POST',
    headers: {
      // "Content-Type": "multipart/form-data"
    },
    body: formData
  }).then((res) => res.json())
    .then((data) => {console.log(data);})
    .catch((err) => console.log(err));
}

export default function AllMealAddMealItem() {
  const vendorId = useParams().vendorId;
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

  const [newMealName, setNewMealName] = useState<string>();
  const [newMealPrice, setNewMealPrice] = useState<number>();
  
  const addMealOnClick = () => {
    // Check data validity
    if (typeof newMealName === "undefined")
      alert("餐點名稱不能為空");
    else if (typeof newMealPrice === "undefined")
      alert("餐點價格不能為空");
    else if (newMealPrice < 0)
      alert("餐點價錢不能為負");
    else if (count <= 0)
      alert("預設庫存不得小於1");
    else if (image.length == 0)
      alert("餐點圖片不能為空");
    else {
      const today = new Date().getDay();
      let inventory: Record<string, number> = {};
      for (let i = 0; i < 3; i++){
        const day = (today-1+i) % 7 + 1;
        inventory[day.toString()] = 0;
      }
      for (let i = 3; i < 7; i++){
        const day = (today-1+i) % 7 + 1;
        inventory[day.toString()] = count;
      }

      const newMeal: Meal = {
        Meal_ID: -1,
        Vendor_ID: Number(vendorId),
        Meal_Name: newMealName,
        Description: "",
        Price: newMealPrice,
        Inventory: inventory,
        Image_url: '',
        Default_Inventory: count
      };
      sendNewMealData(newMeal, image[0].file);
    }
  }

  return (
    <div className={style.addMealItem_item}>
      <div className={style.addMealItem_attributeContainer}>
        <div className={style.addMealItem_mealContainer}>
          <div className={style.addMealItem_contentContainer}>
            <MealText placeholder={"餐點名稱"} inputType={"text"} setInput={setNewMealName}/>
            <MealText placeholder={"餐點價格"} inputType={"number"} setInput={setNewMealPrice}/>
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
          <AddMealButton text="新增餐點" onClickFunc={() => {addMealOnClick()}}/>
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