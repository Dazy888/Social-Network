import multer from "multer"

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (rqe, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

export const upload = multer({storage: fileStorageEngine})









// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb) {
//         // const date = moment().format('DDMMYYYY-HHmmss_SSS')
//         cb(null, `${new Date().toISOString()}-${file.originalname}`)
//     }
// })
//
// const types = ['image/png', 'image/jpeg', 'image/jpg']
//
// const fileFilter = (req, file, cb) => {
//     if (types.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
//
// export default multer({storage, fileFilter})
