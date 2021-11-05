// Jordan Fritzen
// Fall 2021
// Web233 Javascript
// 10/31/21
// Assignment #12

//v 4.0 read cookie on load and display.
window.onload = function() {
  populateshoppinglistonload();
  displayShoppinglist();
}

// Create array for shopping list.
var shoppinglist = [];



//v 3.0 Create Objects for Shoppinglist
var MyItems = {
  name:"",
  price:""
};

//v 3.1 Create empty array for addtocart.
var addtocart = [];

// DEFINE FUNCTIONS

//v 4.0 save cookie
function savecookie() {
  delete_cookie('fritzenlist');
  var date = new Date();
  //Keeps for a year.
  date.setTime(date.getTime() + Number(365) * 3600 * 1000);
  document.cookie = 'fritzenlist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

//v 4.0 read cookie and return.
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)=='') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

//v 4.0 delete cookie
function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//v 4.0 save cookie
function savecookie() {
  delete_cookie('fritzenlist');
  var date = new Date();
  // Keeps for a year.
  date.setTime(date.getTime() + Number(365) * 3600 * 1000);
  document.cookie = 'fritzenlist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

//v 4.0 populate shoppinglist on load.
function populateshoppinglistonload() {
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('fritzenlist');
  //remove unwanted chars and format.
  y = remove_unwanted(y);
  //split array by comma. %2C
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
  }
}

//v 4.0 remove and format cookie
function remove_unwanted(str) {  
    
  if ((str===null) || (str===''))  
       return false;  
 else  
   str = str.toString();  
   str = str.replace(/%20/g, "");
   str = str.replace(/%24/g, "$"); 
   str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');  
}  


// Create function to change shopping list items on given position.

//v 3.1 Update ChangeShoppingList.
function changeShoppinglist(position) {
  //document.getElementById("MyList").innerHTML = shoppinglist[position];
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
   var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  shoppinglist[position] = eitem + "," + '$' + ecost;
  displayShoppinglist();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie(); 
}

//v 3.1 Create function to change shopping cart.
function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  addtocart[position] = eitem + "," + '$' + ecost;
  displayShoppinglist();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie();
}

//v 3.1 Create function addbacktoshoppinglist()
function addbacktoshoppinglist(item, num) {
  // Push to deleteShoppingCart
  deleteShoppingCart(num);
  shoppinglist.push(item);
  // Display shoppinglist and cart.
  displayShoppinglist();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie();
  clearFocus();
}

//v 3.1 Create function addtoshopcart()
function addtoshopcart(item, num) {
  deleteShoppinglist(num);
  addtocart.push(item);
  // Display shoppinglist and cart.
  displayShoppinglist();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie();
  clearFocus();
}

// Version 4.0 Update addShoppingList to replace comma with |.
function addShoppinglist(item, cost) {
  //v 3.0 declare variable for groc string.
  var groc = "";

  //v 3.0 declare variable for loop count.
  var count = 0;

  //v 3.0 edit value for MyItems.name
  MyItems.name=item;

  //v 3.0 edit value for MyItems.cost
  MyItems.price=cost;
  
  //v 3.0 for loop through object properties and ...
  for (var x in MyItems){
    if (count===1){
      groc += "$";
    }
    // ... add to groc string from object array item.
    groc += MyItems[x];
    if (count===0) {
        //v4.0 Update
        groc += " | ";
    }
    // Increment count by 1.
    count++;
  }

  // Push to shoppinglist
  shoppinglist.push(groc);

  // Display shoppinglist.
  displayShoppinglist();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie();

  //2.1: Call function 'clearFocus'.
  clearFocus();
}

// v 3.0 Update function clearFocus().
function clearFocus() {
  // v 2.1 Clear inputbox value out by id.
  document.getElementById("item").value = "";
  // v 3.0 Clear cost field.
  document.getElementById("cost").value = "";
  // v 2.1 Set focus on inputbox after text is cleared.
  document.getElementById("item").focus();
}

// v 3.1 Update displayShoppinglist().

function displayShoppinglist() {
  var TheList = "";
  var arrayLength = shoppinglist.length;
  for (var i = 0; i < arrayLength; i++) {
    var btnDelete = '<input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglist(' + i + ')" />';
    var btnUpdate = '<input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';
    var arrays = shoppinglist[i];
    arrays = "'" +arrays+ "'";
    var btnAddCart = '<input class="button" name="add" type ="button" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i + ')" />';
    TheList = TheList + shoppinglist[i] + btnDelete + '' + btnUpdate + '' + btnAddCart + '<br>';
  }

  if (arrayLength > 0) {
    document.getElementById("MyList").innerHTML = 'Shopping List' + '<br>' + TheList;
  }
  else {
    document.getElementById("MyList").innerHTML = '';
  }
  
}

//v 3.2 Update displayShoppingCart()
function displayShoppingCart() {
  var TheList = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) {
var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
//v 3.2 remove edit button
//var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
var arrays = addtocart[i];
arrays = "'"+arrays+"'";
//v 3.2 change add button to checkbox.
var btnaddlist =  ' <label> <input name="add" type="checkbox" id="adds"  value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>Add</label>';
TheRow =  "<li>" + addtocart[i] + btndelete + ' ' +  ' ' + btnaddlist + '<br></li>';
TheList += TheRow;
}

if (arrayLength > 0) {
  document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br>' + TheList;
}
else {
  document.getElementById("MyCart").innerHTML = '';
}

}

// v 3.1 Update deleteShoppinglist
function deleteShoppinglist(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglist();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie();
}

// v 3.1 Create function deleteShoppingCart()
function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglist();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie();
}




// Unused Functions and Function Calls

// Call first function to display original shopping list.
//displayShoppingList();

// Create function to add item without argument.
//function addShoppingListItem() {
//  shoppingList.push('add new item 4');
//}

// Call function to add item without argument (item #4).
//addShoppingListItem();

// Call function to display updated shopping list.
//displayShoppingList();

// Call function to add item with argument and display.
//addShoppingList('add new item 5');

// Call function to change item 1.
//changeShoppingList(0, 'changed item 1');

// Call function to add new item 6.
//addShoppingList('add new item 6');

// Call function to change item 6.
//changeShoppingList(5, 'changed item 6');

// Call function to delete item 6.
//
//deleteShoppingList(5);