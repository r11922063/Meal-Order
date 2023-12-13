// export const BACKEND_URL = "http://localhost:8081"
export const BACKEND_URL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`
// export const MEAL_IMG_DESTINATION = "../frontend2/src/assets/meal_imgs"
// export const WS_URL = "ws://localhost:8081"
export const WS_URL = `${process.env.REACT_APP_WS_HOST}:${process.env.REACT_APP_WS_PORT}`