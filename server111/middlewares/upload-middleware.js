import multer from "multer"

function createFileStorageEngine(path) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path)
        },
        filename: (rqe, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname)
        }
    })
}

export const uploadBanner = multer({storage: createFileStorageEngine('./uploads/banners')})
export const uploadAvatar = multer({storage: createFileStorageEngine('./uploads/avatars')})