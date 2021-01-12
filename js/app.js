'use strict';
// image definition
var leftImg = document.getElementById('left_img');
var centerImg = document.getElementById('center_img');
var rightImg = document.getElementById('right_img');

// containner image definition
var productSection = document.getElementById('all_img');

// chart container definition
var productCanvas = document.getElementById('productChart').getContext('2d');
var productCanvasLine = document.getElementById('productLine').getContext('2d');
var productCanvasPie = document.getElementById('productPie').getContext('2d');

// array to store the image that display 
var checkExist = [];

// array to store the object we create 
var productImage = [];

// number of choose
var numberOfChooses = 25;

// defined constructor 
function AllProducts(image) {
  this.image = "img/" + image;
  this.name = getName(image);
  this.shown = 0;
  this.counter = 0;
  productImage.push(this);

}

// get name from image
function getName(image) {
  return image.split(".")[0];
}

// create local storage to store data 
function productData() {
  localStorage.setItem('products', JSON.stringify(productImage));
}

// clear local storage
function clearLocalStorage(event) {
  localStorage.clear();
  productImage = [];
  location.reload();
}

// back up the data from localstorage to object array 
function retrieveData() {
  if (localStorage.length > 0) {
    productImage = JSON.parse(localStorage.getItem('products'));
  }
  console.log(productImage);
}

// display product in image and increse the shown by 1
function renderProducts(leftImage, centerImage, rightImage) {
  leftImg.setAttribute('src', productImage[leftImage].image);
  productImage[leftImage].shown++;
  centerImg.setAttribute('src', productImage[centerImage].image);
  productImage[centerImage].shown++;
  rightImg.setAttribute('src', productImage[rightImage].image);
  productImage[rightImage].shown++;
}

// check if image display once 
function isExist(productdisplayed) {
  for (var index = 0; index < checkExist.length; index++) {
    if (checkExist[index].name === productdisplayed) {
      return true;
    }
  }
  return false;
}

// choose image index
function chooseImage() {
  do {
    var leftImage = Math.round(Math.random() * (productImage.length - 1));
    var leftImageName = productImage[leftImage].name;
  } while (isExist(leftImageName));
  do {
    var centerImage = Math.round(Math.random() * (productImage.length - 1));
    var centerImageName = productImage[centerImage].name;
    var rightImage = Math.round(Math.random() * (productImage.length - 1));
    var rightImageName = productImage[rightImage].name;
  } while (leftImage === centerImage || centerImage === rightImage || leftImage === rightImage || isExist(centerImageName) || isExist(rightImageName));

  checkExist = [];

  checkExist.push(
    productImage[leftImage],
    productImage[centerImage],
    productImage[rightImage]
  );

  renderProducts(leftImage, centerImage, rightImage);
}

// add one to counter of image
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

// count the image 
function countProduct(event) {
  var targetId = event.target.id;

  if (numberOfChooses !== 0) {
    if (targetId === 'left_img' || targetId === 'center_img' || targetId === 'right_img') {
      var objectIndicator = event.target.getAttribute('src');
      checkImageProduct(objectIndicator);
      chooseImage();

    }

  } else {
    productSection.removeEventListener('click', countProduct);
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



chooseImage();

// render chart
function renderBarChart() {

  var productNameArray = [];
  var productCounterArray = [];
  var productShownArray = [];


  for (var index = 0; index < productImage.length; index++) {
    productNameArray.push(productImage[index].name);
    productCounterArray.push(productImage[index].counter);
    productShownArray.push(productImage[index].shown);

  }

  var productChartDisplay = new Chart(productCanvas, {
    type: 'bar',
    data: {
      labels: productNameArray,
      datasets: [
        {
          label: '# of Product Clicks',
          data: productCounterArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',

            'rgba(255, 92, 122, 0.2)',
            'rgba(34, 132, 215, 0.2)',
            'rgba(255, 226, 116, 0.2)',
            'rgba(85, 162, 122, 0.2)',
            'rgba(133, 82, 255, 0.2)',
            'rgba(255, 149, 24, 0.2)',
            'rgba(255, 90, 102, 0.2)',
            'rgba(84, 122, 245, 0.2)',
            'rgba(255, 106, 96, 0.2)',
            'rgba(35, 142, 182, 0.2)',
            'rgba(133, 72, 255, 0.2)',
            'rgba(255, 109, 94, 0.2)',
            'rgba(255, 39, 102, 0.2)',
            'rgba(54, 192, 215, 0.2)'

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Time shown for the Single Product',
          data: productShownArray, // array of values (count for each goat when it was clicked)
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5
          }
        }]
      }
    }
  });
}
// render chart
function renderLineChart() {

  var productNameArray = [];
  var productCounterArray = [];
  var productShownArray = [];


  for (var index = 0; index < productImage.length; index++) {
    productNameArray.push(productImage[index].name);
    productCounterArray.push(productImage[index].counter);
    productShownArray.push(productImage[index].shown);

  }

  var productLineDisplay = new Chart(productCanvasLine, {
    type: 'line',
    data: {
      labels: productNameArray,
      datasets: [
        {
          label: '# of Product Clicks',
          data: productCounterArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Time shown for the Single Product',
          data: productShownArray, // array of values (count for each goat when it was clicked)
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
// render chart
function renderPieChart() {

  var productNameArray = [];
  var productCounterArray = [];
  var productShownArray = [];


  for (var index = 0; index < productImage.length; index++) {
    productNameArray.push(productImage[index].name);
    productCounterArray.push(productImage[index].counter);
    productShownArray.push(productImage[index].shown);

  }

  var productPieDisplay = new Chart(productCanvasPie, {
    type: 'pie',
    data: {
      labels: productNameArray,
      datasets: [
        {
          label: '# of Product Clicks',
          data: productCounterArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Time shown for the Single Product',
          data: productShownArray, // array of values (count for each goat when it was clicked)
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            segmentShowStroke: false,
            animateScale: true
          }
        }]
      }
    }
  });
}

var section = document.getElementById("result");
productSection.addEventListener('click', countProduct);

// display result in list
function renderList(event) {
  event.preventDefault();
  productData();
  renderBarChart();
  renderLineChart();
  renderPieChart();
  console.log(localStorage);
  var ul = document.createElement("ul");
  section.appendChild(ul);
  for (var j = 0; j < productImage.length; j++) {
    var li = document.createElement("li");
    li.textContent = "- " + productImage[j].name + " had " + productImage[j].counter + " votes, and was seen " + productImage[j].shown + " times.";
    ul.appendChild(li);
  }
}
displayResult.addEventListener("click", renderList);
var resetResult = document.getElementById("reset");
resetResult.addEventListener('click', clearLocalStorage);
retrieveData();

