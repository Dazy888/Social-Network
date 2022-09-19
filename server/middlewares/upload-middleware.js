import multer from "multer"

const fileStorageEngineBanner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/banners')
    },
    filename: (rqe, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const fileStorageEngineAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/avatars')
    },
    filename: (rqe, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

export const uploadBanner = multer({storage: fileStorageEngineBanner})
export const uploadAvatar = multer({storage: fileStorageEngineAvatar})