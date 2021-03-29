const createArray = () => {

    // Order Format

    let orders = [
        ["1", "buy", "bitcoin", "0.00135035", "29935", "40.42"],
    ]

    

    console.log(orders);

    /*
    console.log("ARRTOSTRING orders: " + arrToString(orders));
    console.log("addSemicolons orders: " + addSemicolons(arrToString(orders), 6));
*/
    // Initialization of Local Storage ("totalOrders")

    localStorage.setItem("totalOrders", addSemicolons(arrToString(orders), 6));
    console.log(localStorage.getItem("totalOrders"));



    let localorders = stringToArray((localStorage.getItem("totalOrders")));
    console.log(localorders);
    localorders.push(["2", "sell", "bitcoin", "0.00135035", "29935", "40.42"]);
    console.log(localorders);
    localStorage.setItem("totalOrders", addSemicolons(arrToString(localorders), 6));
    console.log(stringToArray((localStorage.getItem("totalOrders"))));

    createTable(localorders);
    let newOrder = ["3","buy","bitcoin","1","30000","30000"]
    console.log(newOrder);
    createOrder(newOrder);
    
    createOrder([4,"buy", "ethereum", "1", "1900", "1900"]);
    
}


// This is our 2d Array to string method 
// (2D Array) => (string)
// Example: 'Bob,1234,Bob@example.com,Mark,5678,Mark@example.com'

const arrToString = (arr) => {
    let str = "";
    for (let item of arr) {
        if (Array.isArray(item)){
            str += arrToString(item);
        }
        else{
            str += item + ',';
        }
    }
    return str;
}

//This is our formatting method that parses our string to our intended format to allow it to be used in both arr/str functions
// (string delimited by commas) => (string delimited by commas and semicolons)
// Example: 'Bob,1234,Bob@example.com;Mark,5678,Mark@example.com'

const addSemicolons = (str, arraySize) => {
    let newString = "";
    let count = 0;
    for (let i = 0; i < str.length; i++){
        if (str.charAt(i) == ','){
            count++;
            if ((count % arraySize == 0) && count != 0){
                newString += ";";
            }
            else{
                newString += str.charAt(i);
            }
        }
        else{
            newString += str.charAt(i);
        }
    }
    if ((newString.charAt(newString.length - 1)) == ";"){
        
        return newString.slice(0,-1);   
    }
    return newString;
}


// This is our string to array method that will be used to convert a string to a 2d array.
// Needs a ; to separate arrays
const stringToArray = (str) => {
    let arr = [];
    console.log(str);
    arr = str.split(';');
    for(let i = 0; i < arr.length; i++){
       arr[i] = arr[i].split(',');
    };
    return arr;
    
}

const createTable = (tableData) => {

    // Create Table Object and assign ID
    var table = document.createElement('table');
    table.setAttribute("id","orders-table");

    // Create Header
    
    var tableHeader = document.createElement('tr');
    var table0 = document.createElement('th');
    var table1 = document.createElement('th');
    var table2 = document.createElement('th');
    var table3 = document.createElement('th');
    var table4 = document.createElement('th');
    var table5 = document.createElement('th');

    table0.innerHTML="Order ID";
    table1.innerHTML="Order Type";
    table2.innerHTML="Cryptocurrency";
    table3.innerHTML="Quantity";
    table4.innerHTML="Price";
    table5.innerHTML="Total Cost";

    tableHeader.appendChild(table0);
    tableHeader.appendChild(table1);
    tableHeader.appendChild(table2);
    tableHeader.appendChild(table3);
    tableHeader.appendChild(table4);
    tableHeader.appendChild(table5);

    //Create Body
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    document.body.appendChild(table);
}

const createOrder = (arr) => {
    
    // arr = new order array

    // Retrieve localStorage "totalOrders" string
    let string = localStorage.getItem("totalOrders");

    // Parse string into 2d Array
    let array = stringToArray(string);
    console.log(array);
    
    // push order into 2D Array
    array.push(arr);

    // Print array into console
    console.log(array);

    // parse order into string (delimited by commas)
    let allOrders = addSemicolons(arrToString(array), 6);

    // parse all Orders into (,,;,,;) notation
//    addSemicolons(allOrders, 6);
    console.log("NEW STRING: " + allOrders);

    // Update localStorage with updated string

    localStorage.setItem("totalOrders", allOrders);

    // Update Table
    createTable(array);
}



createArray();



