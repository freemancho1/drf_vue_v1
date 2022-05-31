# Vue.js 3 Composition API Sample Code with Bootstrap 5.x
<br/><br/>

## Project setup
<br/>

### Main package
```
npm install
vue create vue-bs5
cd vue-bs5
npm install bootstrap
npm install @popperjs/core
npm install bootstrap-icons
npm install material-icons
```
> Append `src/main.js`
```
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-icons/iconfont/material-icons.css'
```
<br/>

### Third party package
```
npm install axios
npm install vee-validate
npm install yup
```
<br/><br/>



## Compiles
<br/>

> Hot-reloads for development
```
npm run serve
```
<br/>

> Minifies for production
```
npm run build
```
<br/><br/>


## Google Material Icons
<br/>

[Google material icons](https://fonts.google.com/icons?selected=Material+Icons)
<br/><br/>

### Import
<br/>

#### NPM install
```
npm install material-icons
```
<br/>

#### How to use &lt;LINK&gt; tag

```
<!-- Filled icons import -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- Outlined icons import [GOOD] -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">

<!-- Rounded icons import [GOOD] -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Rounded" rel="stylesheet">

<!-- Sharp icons import -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet">

<!-- Twotone icons import -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Twotone" rel="stylesheet">
```
<br/>

### Usage
```
<!-- Filled icons import -->
<span class="material-icons">
    account_circle
</span>

<!-- Outlined icons import [GOOD] -->
<span class="material-icons-outlined">
    account_circle
</span>

<!-- Rounded icons import [GOOD] -->
<span class="material-icons-round">
    account_circle
</span>

<!-- Sharp icons import -->
<span class="material-icons-outlined">
    account_circle
</span>

<!-- Twotone icons import -->
<span class="material-icons-two-tone">
    account_circle
</span>
```
<br/><br/>


## Reference site
<br/>

### Bootstrap 5
* [Homepage](https://getbootstrap.com/) <small>ver 5.2, 2022.05</small>

<br/>