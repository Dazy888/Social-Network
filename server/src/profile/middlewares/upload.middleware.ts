import * as multer from "multer"

function createFileStorageEngine(path) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname)
        }
    })
}

export const uploadBanner = multer({storage: createFileStorageEngine('./uploads/banners')})
export const uploadAvatar = multer({storage: createFileStorageEngine('./uploads/avatars')})