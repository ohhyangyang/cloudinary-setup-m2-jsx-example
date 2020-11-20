# Cloudinary Setup - NodeJS, Express, SSR


### 1. Create free Cloudinary account 
Register for free here: <https://cloudinary.com/users/register/free>



<br>



### 2. Install packages

Install the following 3 packages in your project folder:
* [cloudinary](https://www.npmjs.com/package/cloudinary)
* [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)
* [multer](https://www.npmjs.com/package/multer) => like body-parser, Multer parses incoming bodies but also allows us to parse files  (unlike body-parser that parses only data)

In your terminal:
```
npm install cloudinary@1.21.0 multer-storage-cloudinary@2.2.1 multer@1.4.2 --save --save-exact
```





<br>



### 3. Configure Cloudinary & Multer

In your terminal:
```
mkdir config 
touch config/cloudinary.js
```



##### `config/cloudinary.js`

```js
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'destination-folder-in-cloudinary',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});
 
const parser = multer({ storage: storage });

module.exports = parser;
```





<br>





### 4. Create/update the `Signup` view form

* Add the attribute `encType="multipart/form-data"` to your form (in HTML `enctype`)   .

* Add the element `<input type="file" name="profilepic"/>` to the form. This input is used to upload the image and send it during the form submission.

  

##### `views/Signup.jsx`

```html
const React = require("react");
const Layout = require("./Layout");

function Signup() {
  return (
    <Layout title="Signup Page">
      <h2>Cloudinary Example</h2>
      <form action='/auth/signup' method='POST' enctype="multipart/form-data" >
  
        <label>Email</label>
        <input type='text' name='email' />

        <label>Password</label>
        <input type='password' name='password'/>

        <label>Profile picture</label>
        <input type='file' name='profilepic'/>

        <button type='submit'>Sign Up</button>
      </form>
    </Layout>
  );
}

module.exports = Signup;
```



<br>



### 5. Inject the parsing middleware into the route

In the router where we want to upload the image: 
* Import the parsing middleware  we created in `config/cloudinary.js`.
* Add it as a middleware (a second argument ) prior to the route handler function that handles the POST request.



##### `routes/authRouter.js`

```js
const parser = require('./../config/cloudinary');

// ...

// ...


// POST     /auth/signup
authRouter.post('/signup', parser.single('profilepic'), (req, res, next) => {
  // `multer` parses the incoming image coming from the form data and upload's it using 
  // the middleware `parse.single('profilepic') we set above.
  
  
  // The URL of the image uploaded to the cloudinary servers by the middleware becomes available via the `req.file.secure_url` property
  const imageUrl = req.file.secure_url;
  
  const newUser = { email, password, image: imageUrl };

  
  // Here we usually have our authentication/signup logic... 
  // ...checking email/password, hashing password, etc.

  User.create(newUser)
    .then((createdUser) => {
      createdUser.password = '***';
      req.session.currentUser = createdUser;
      
      res.redirect('/profile');
    })
    .catch((err) => console.log(err));
}
            
                
```



<br>





### 6. Display the uploaded photo in `Profile` view



<br>



### Documentation

[Cloudinary](https://cloudinary.com/documentation)