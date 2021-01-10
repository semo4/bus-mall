'use strict';



var leftImg = document.getElementById('left_img');
var centerImg = document.getElementById('center_img');
var rightImg = document.getElementById('right_img');

var productSection = document.getElementById('all_img');

var productImage= [];
var numberOfChooses = 25;
function AllProducts(image){
  this.image = "img/"+image;

  this.name = getName(image);
  this.shown = 0;
  this.counter = 0;
  productImage.push(this);
}

function getName(image){
  return image.split(".")[0];

}

function renderProducts(leftImage, centerImage,rightImage) {
  leftImg.setAttribute('src', productImage[leftImage].image);
  productImage[leftImage].shown++;
  centerImg.setAttribute('src', productImage[centerImage].image);
  productImage[centerImage].shown++;
  rightImg.setAttribute('src', productImage[rightImage].image);
  productImage[rightImage].shown++;
}


function chooseImage(){
  var leftImage = Math.round(Math.random() * (productImage.length - 1));
  do {
    var centerImage = Math.round(Math.random() * (productImage.length - 1));
    do{
      var rightImage = Math.round(Math.random() * (productImage.length - 1));

    }while (centerImage === rightImage || leftImage === rightImage);

  } while (leftImage === centerImage);
  renderProducts(leftImage,centerImage,rightImage);
}


function checkImageProduct(objectIndicator) {
  for (var i = 0; i < productImage.length; i++) {
    if (productImage[i].image === objectIndicator) {
      productImage[i].counter++;
      numberOfChooses--;
    }
  }
}


var displayResult = document.getElementById("display");
displayResult.disabled = true;
function countProduct(event) {
  var targetId = event.target.id;
  
  if (numberOfChooses !== 0) { 
    if (targetId === 'left_img' || targetId === 'center_img' ||targetId === 'right_img') { 
      var objectIndicator = event.target.getAttribute('src');
      checkImageProduct(objectIndicator);
      chooseImage();
     
    }

  } else {
    productSection.removeEventListener('click',countProduct);
    displayResult.disabled = false;
  }
}

new AllProducts("bag.jpg");
new AllProducts("banana.jpg");
new AllProducts("bathroom.jpg");
new AllProducts("boots.jpg");
new AllProducts("breakfast.jpg");
new AllProducts("bubblegum.jpg");
new AllProducts("chair.jpg");
new AllProducts("cthulhu.jpg");
new AllProducts("dog-duck.jpg");
new AllProducts("dragon.jpg");
new AllProducts("pen.jpg");
new AllProducts("pet-sweep.jpg");
new AllProducts("scissors.jpg");
new AllProducts("shark.jpg");
new AllProducts("sweep.png");
new AllProducts("tauntaun.jpg");
new AllProducts("unicorn.jpg");
new AllProducts("usb.gif");
new AllProducts("water-can.jpg");
new AllProducts("wine-glass.jpg");

console.log(productImage);

chooseImage();


var section = document.getElementById("result");

productSection.addEventListener('click', countProduct);

function renderList(event){
  event.preventDefault();
  var ul = document.createElement("ul");
  section.appendChild(ul);
  for (var j =0; j<productImage.length; j++){
    var li = document.createElement("li");
    li.textContent = productImage[j].name + " had "+productImage[j].counter +" votes, and was seen "+ productImage[j].shown +" times.";
    ul.appendChild(li);
  } 
}


displayResult.addEventListener("click",  renderList);


