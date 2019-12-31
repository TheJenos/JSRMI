# JSRMI[JavaScript Remote Method Interface]
JavaScript Remote method interface helps to communicate between Server side JS(NodeJs) and Client side JS

## Basic idea
JSRMI can allows an object to invoke methods on an object that running on server side without worring about routings and other stuffs. Currently it can handle parameters and errors on this stage

![Diagram](https://i.ibb.co/yYrnts1/Untitled-Diagram.png)

### Prerequisites
JSRMI base with express js and body-parser
```
npm i express
npm i body-parser
```

### Installing
First you have to add the JSRMI to your project
```
 npm i jsrmi
```
Then import it to your project
```
 const jsrmi = require('jsrmi');
 const path = require('path');
```
After that, you have to create a folder for controllers and configure it like this
```
app.set('controllers', path.join(__dirname, '/controllers'))
```
And now create a JS file on the controller path. This is a basic login example code of a controller
```
module.exports = function () {
    this.test = async function (gg) {
        console.log("tst is run " + gg);
        return { fff: "ddd" };
    }
    this.login = async function (Username, Password) {
        if (Username == "" || Username == undefined) throw "Invalid Username";
        if (Password == "" || Password == undefined) throw "Invalid Password";
        return (Username == "ABC" && Password == "123") ? "Login Success" : " Login Fail";
    }
}
```
Now we have to connect the JSRMI to the server.
```
jsrmi.route(app);
```
For the example, i use a simple login structure and i connect my JSRMI.js client side JS on to that html.
Clinet JS -> https://raw.githubusercontent.com/gobzateloon/JSRMI/master/Js/jsrmi.js
```
app.use("/",express.static(__dirname + '/views'));
app.use("/js",express.static(__dirname + '/Js'));
```

## Running
### How it's work
just create the remote object like this
```
<script src='/Js/jsrmi.js'></script>
<script>
var test = new jsrmi("test_controller");
//var test = new jsrmi("your controler file name without .js");
</script>
```
That's all. now you can call any method of that controller. Also you can bring exception to the clinet side.
```
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

## If you miss something or didn't work, then you can clone it from github and run the test


## Built With
* JavaScript - client side
* NodeJS - backend server side

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
