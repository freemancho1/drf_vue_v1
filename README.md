# Django & Vue.js Sample Code
<br/><br/>


## Django with DRF(Django REST Framework)
<br/>

### Installed Packages
<br/>

> Command
```command
pip install -r requirements.txt
```
<br/>

> Content of the `requirements.txt` file
```python
Django
djangorestframework
djangorestframework-simplejwt
mysqlclient
Pillow
```
<br/>

### Using DBMS : SQLite3
<br/><br/><br/>


## Vue.js 3 Composition API Sample Code with BS5
<br/><br/>

### Project setup
<br/>

#### Main package
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

#### Third party package
```
npm install axios
npm install vee-validate
npm install yup
```
<br/><br/>


### Compiles
```python
npm run serve   # Hot-reloads for development
npm run build   # Minifies for production
```
<br/><br/>


### Google Material Icons
<br/>

[Google material icons](https://fonts.google.com/icons?selected=Material+Icons)
<br/><br/>

#### Import
<br/>

> NPM install
```
npm install material-icons
```
<br/>

> How to use `<LINK>` tag

```html
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

#### Usage
```html
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