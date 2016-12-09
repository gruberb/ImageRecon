exports.containsPeople = function (array) {
    let contains = false;
     array.forEach((item) => {
         console.log(item.name, item.value + ' \n');
         if(item.name === 'people') {
             contains = true;
         }
     });

     return contains;
}
 