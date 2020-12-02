# CryptMail FrontEnd
Web app email client created using ReactJS. The app is integrated with Google but currently only limited to @std.stei.itb.ac.id domain. 

You can add additional security measures using this app by giving digital signature and encryption to the email that you sent. Encryption is done using custom block cipher called <a href=https://informatika.stei.itb.ac.id/~rinaldi.munir/Kriptografi/2020-2021/Makalah-UTS/Makalah1-Kripto-015-2020.pdf>Wonderful Journey Block Cipher</a>. Digital signature is done using ECDSA with Keccak Hash function.

## Requirements
- NodeJS (>=10.19.0)
- NPM (>=6.14.4)

## Installation
Go to project root directory, install all dependencies by running:
```
npm i
```
Start the web app locally by typing:
```
npm start
```

## Deployment
You can create the optimized build of the web app by running:
```
npm run build
```
The built project will be located in the build directory. You can serve this directory using PHP, nginx, apache2, etc.

## Try Me
This web app is live and running on https://cryptmail.ml