/**
 * @file multer-config.ts
 * @description Configuration du middleware Multer pour l'upload d'images sur le serveur.
 */

import multer, { StorageEngine, FileFilterCallback } from 'multer'
import { Request } from 'express'
import path from 'path'

const MIME_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg':  'jpg',
  'image/png':  'png',
}

const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, callback) => {
    callback(null, 'images')
  },
  filename: (_req: Request, file: Express.Multer.File, callback) => {
    const name      = path.parse(file.originalname).name.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, `${name}_${Date.now()}.${extension}`)
  },
})

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true)
  } else {
    callback(new Error('Format de fichier non supporté (jpeg, jpg, png uniquement)'))
  }
}

export default multer({ storage, fileFilter }).single('image')
