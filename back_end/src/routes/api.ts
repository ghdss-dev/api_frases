import {Router} from 'express'; 
import multer from 'multer';

import * as ApiController from '../controllers/apiController';

/*const storageConfig = multer.diskStorage({

    destination: (req, file, cb) =>{
        let randomName = Math.floor(Math.random() * 99999999);
        cb(null, './tmp');
    }, 

    filename: (req, file, cb) => {

        cb(null, file.fieldname + '.jpg');
    }
});*/

const upload = multer({

    //storage: multer.memoryStorage()
    //storage: storageConfig
    dest: './tmp',
    fileFilter: (req, file, cb) => {

        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));
    }, 

    limits: { fileSize: 200000000 }
})

const router = Router();

router.get('/ping', ApiController.ping)

router.get('/random', ApiController.random)

router.get('/nome/:nome', ApiController.nome);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrases);
router.get('/frase/aleatoria', ApiController.randomPhrase);
router.get('/frase/:id', ApiController.getPhrase);
router.put('/frase/:id', ApiController.updatePhrase);
router.delete('/frase/:id', ApiController.deletePhrase);

//router.post('/upload', upload.array('avatars', 2), ApiController.uploadFile);

/*router.post('/upload', upload.fields([

    {name: 'avatar', maxCount: 1}, 
    {name: 'gallery', maxCount: 3 }
    
]), ApiController.uploadFile);*/

router.post('/upload', upload.single('avatar'), ApiController.uploadFile);


export default router;