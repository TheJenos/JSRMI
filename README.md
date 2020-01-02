# JSRMI [JavaScript Remote Method Interface][Beta]
![shields-npm-d](https://img.shields.io/npm/dy/jsrmi) ![shields-npm-l](https://img.shields.io/npm/l/jsrmi) ![shields-npm-v](https://img.shields.io/npm/v/jsrmi)

JavaScript Remote method interface helps to communicate between Server-side JS(NodeJs) and Client-side JS

## Basic Idea
This is the world's first framework that helps to direct access to the server-side controller functions from the browser side (client-side) without having any troubles. And also it has a universal mechanism for cross communicate. Although currently, this framework supports only Nodejs. But we hope to release this technology to the JavaEE.

![yYrnts1](https://i.ibb.co/yYrnts1/Untitled-Diagram.png)

## Benefits
- You know that when using the REST API, It needs to route every controller in every function manually. But with this framework that part is unnecessary. Because it handles automatically.
- Creating AJAX Objects in client-side and calling the REST API is the traditional way to send AJAX requests. But there is nothing to do like that if you use this framework. Because that process is handled by itself.
- It is possible to use Sessions, Multipart data and file uploading as a normal system.
- As well as Http Request Objects and Response Objects can be used as normal.
- No time-wasting.
- In the feature, we hope to add end to end encryption and java implementation for this technology.

## Release
### Version 1.1.1
- Mutipart support (https://github.com/gobzateloon/JSRMI/wiki/Multipart-(File-Uploading))
- Minified version is updated
### Version 1.0.3
- First Beta Release

## Installation
### Server Side
First you have to add the JSRMI to your project
```
 npm i jsrmi
```
Then import it to your project
```js
 const jsrmi = require('jsrmi');
 const path = require('path');
```
After that, you have to create a folder for controllers and configure it like this
```js
app.set('controllers', path.join(__dirname, '/controllers'))
```
And now create a JS file on the controller path. This is a basic login example code of a controller
```js
module.exports = function () {
 this.login = async function (Username, Password) {
 if (Username == "" || Username == undefined) throw "Invalid Username";
 if (Password == "" || Password == undefined) throw "Invalid Password";
 return (Username == "ABC" && Password == "123") ? "Login Success" : " Login Fail";
 }
}
```
Now we have to connect the JSRMI to the server.
```js
jsrmi.route(app);
```
For example,here is a simple login structure that connected JSRMI.js client side JS on to that html. Nothing to worry
client js is automatically hosted on "/jsrmi.js" path. all you have to do is add your views to the "/views" folder
```js
app.use("/",express.static(__dirname + '/views'));
```

#### Sample Login
```html
<div class="card mt-3">
 <div class="card-body">
 <h4 class="card-title">Login Form</h4>
 <p class="card-text">
 <div class="form-group">
 <label for="exampleInputEmail1">Email address</label>
 <input type="email" class="form-control" id="exampleInputEmail1"
 aria-describedby="emailHelp" placeholder="Enter email">
 <small id="emailHelp" class="form-text text-muted">We'll never share your email with
 anyone
 else.</small>
 </div>
 <div class="form-group">
 <label for="exampleInputPassword1">Password</label>
 <input type="password" class="form-control" id="exampleInputPassword1"
 placeholder="Password">
 </div>
 <input type="button" id="login_btn" class="btn btn-primary" value="Login" />
 </p>
 </div>
</div>
```

### Client side

just create the remote object like this
```html
<script src='/jsrmi.js'></script>
<script>
var test = new jsrmi("test_controller");
//var test = new jsrmi("your controler file name without .js");
</script>
```
That's all. now you can call any method of that controller. Also you can bring exception to the clinet side.
```js
test.login(username, password).then((result) => {
 alert(result);
}).catch((error) => {
 $('#alert').show();
 $('#alert').html(error);
 setTimeout(() => {
 $('#alert').hide();
 }, 2000)
});
```

## If you miss something or didn't work, then you can clone it from GitHub and run the test

## Example projects
- File Uploading https://github.com/gobzateloon/JSRMI_Example

## Built With
* Formidable - Handle multipart
* Body Parser - Convert post data
* ExpressJS - Http handling
* NodeJS - Basic

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details