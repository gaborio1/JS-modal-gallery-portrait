
// ==================== DYNAMIC MODAL BASED ON W3SCHOOLS: https://www.w3schools.com/howto/howto_js_lightbox.asp ====================

// OPEN MODAL
const openModal = () => {
	document.getElementById("modal").style.display = "flex";
	// SLIDE IN AND ENLARGE
	gsap.fromTo(
		".modal",
		{
			x: "-100%",
			// scale: 0.3,
		},
		{
			x: "0%",
			scale: 1,
			duration: 1,
			ease: "power4"
		}
	);
};
  
// CLOSE MODAL
const closeModal = () => {
	const modal = document.getElementById("modal");
	// SLIDE OUT AND SHRINK
	gsap.fromTo(
		".modal",
		{
			x: "0%",
			scale: 1,
		},
		{
			x: "100%",
			// scale: 0.3,
			duration: 2,
			ease: "power4"
		}
	);

	modal.classList.add("fade-out");
	// FADE OUT AND HIDE WHEN TRANSPARENT
	setTimeout(function () {
		modal.classList.remove("fade-out");
		modal.style.display = "none";
	}, 950);
};
  
  let slideIndex = 1;
  
  const plusSlides = (n) => {
    showSlides(slideIndex += n);
  }
  
  const currentSlide = (n) => {
    showSlides(slideIndex = n);
  
    // !!!!! TEMPORARY FIX FOR imageCounterDivs.textContent: !!!!!
    // !!!!! CHECK COMMENTS BELOW !!!!!
    const imageCounterDivs = document.getElementsByClassName("image-counter-div");
    trimmedString = "";
    for (let i = 0; i < imageCounterDivs.length; i++) {
      trimmedString = imageCounterDivs[i].textContent.substring(0,4);
      imageCounterDivs[i].textContent = trimmedString.concat(numberOfFoundImages);
    }
  }
  
    const getCategoryName = () => {
    return document.querySelector(".category-title").innerHTML;
  }
  
  
  // ========== CATEGORY GALLERY ==========
  
  const galleryImgContainer = document.querySelector(".gallery-img-container");
  
  const createGallery = (n) => {
    const galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery-div";
    galleryImgContainer.appendChild(galleryDiv);
  
    const galleryDivImg = document.createElement("img");
    galleryDivImg.className = ("hover-shadow");
    galleryDivImg.src = `images/${getCategoryName()}/${getCategoryName()}-${n}.jpg`;
  
    galleryDivImg.onerror = function () {
      console.log('error loading ' + this.src);
      this.parentElement.remove();
      // this.style.display = "none";
      // this.src = 'error.png'; 
      };
     galleryDiv.appendChild(galleryDivImg);
  }
  
  
  
  // ========== ADD openModal() and currentSlide(n) TO GALLERY IMAGES (<img src="../images/nature-1.jpg" onclick="openModal();currentSlide(1)" class="hover-shadow">) ==========
  const addListenerGalleryImg = () => {
    const galleryImages = document.getElementsByClassName("hover-shadow");
  
    for (let i = 0; i < galleryImages.length; i++) {
      galleryImages[i].addEventListener("click", openModal, false);
      galleryImages[i].addEventListener('click', function(index) { 
        return function () {
          currentSlide(Number(index + 1));
        };
      }(i), true);
    }
  }
  
  // ========== CREATE MODAL DIVS WITH IMAGE-COUNTER AND IMAGES ==========
  
  let numberOfFoundImages = 0;
  const getNumberOfImages = () => {
    const galleryDivs = document.getElementsByClassName("gallery-div");
    numberOfFoundImages = galleryDivs.length;
    console.log("FOUND IMAGES: " + numberOfFoundImages);
    return numberOfFoundImages;
  }
  
  window.onload = getNumberOfImages;
  
  const createModal = (n) => {
    const modalImgContainer = document.querySelector(".modal-img-container");
  
    const modalDiv = document.createElement("div");
    modalDiv.className = "modal-img-div";
    modalImgContainer.appendChild(modalDiv);
  
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const imageCounterDiv = document.createElement("div");
    imageCounterDiv.className = ("image-counter-div");
    // !!!!! TEMPORARY FIX: CONCAT NUMBER OF GALLERY IMAGES TO END OF STRING IN currentSlide() !!!!!
    imageCounterDiv.textContent = n + " / ";
    modalDiv.appendChild(imageCounterDiv);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
    const modalDivImg = document.createElement("img");
    modalDivImg.className = ("modal-img");
    modalDivImg.src = `images/${getCategoryName()}/${getCategoryName()}-${n}.jpg`;
  
    modalDivImg.onerror = function () {
      this.style.display = "none";
      // !!!!! HAVE TO REMOVE PARENT (CONTAINER DIV) !!!!!
      this.parentElement.remove();
      // this.remove();
      // this.src = 'error.png'; 
    };
    modalDiv.appendChild(modalDivImg);
  }
  
  
  // ========== CREATE THUMBNAIL DIVS WITH IMAGES ==========
  const createThumbnail = (n) => {
    const thumbnailContainer = document.querySelector(".thumbnail-container");
      
      const thumbnailDiv = document.createElement("div");
      thumbnailDiv.className = "thumbnail-div";
      thumbnailContainer.appendChild(thumbnailDiv);
    
      const thumbnailDivImg = document.createElement("img");
      thumbnailDivImg.className = ("thumbnail-image");
      thumbnailDivImg.src = `images/${getCategoryName()}/${getCategoryName()}-${n}.jpg`;
     
      thumbnailDivImg.onerror = function () {
        this.parentElement.remove();
        // this.src = 'error.png'; 
    };
    thumbnailDiv.appendChild(thumbnailDivImg);
  }
  
  
  // ========== ADD currentslide(n) TO THUMBNAIL IMAGES ==========
  function addListenerThumbnailImg(){
    const thumbnailImages = document.getElementsByClassName("thumbnail-image");
    
    for (let i = 0; i < thumbnailImages.length; i++) {
      thumbnailImages[i].addEventListener('click', function(index) { 
        return function () {
          currentSlide(Number(index + 1));
        };
      }(i), true);
    }
  }
  
  //  ========== LOOP WILL CHECK FOR maxIndex NUMBER OF IMAGES IN FOLDER ==========
  let index = 1;
  const maxIndex = 10;
  while (index < maxIndex + 1) {
    createGallery(index);
    createModal(index);
    createThumbnail(index);
    index++;
  }
  
  const showSlides = (n) => {
    let i;
    const modalImageDivs = document.getElementsByClassName("modal-img-div");
    const thumbnailImages = document.getElementsByClassName("thumbnail-image");
    // var captionText = document.getElementById("caption");
    if (n > modalImageDivs.length) {slideIndex = 1}
    if (n < 1) {slideIndex = modalImageDivs.length}
    for (i = 0; i < modalImageDivs.length; i++) {
      modalImageDivs[i].style.display = "none";
    }
    for (i = 0; i < thumbnailImages.length; i++) {
      thumbnailImages[i].className = thumbnailImages[i].className.replace(" active", "");
    }
    modalImageDivs[slideIndex-1].style.display = "block";
    thumbnailImages[slideIndex-1].className += " active";
    // captionText.innerHTML = dots[slideIndex-1].alt;
  }
  
  showSlides(slideIndex);
  addListenerGalleryImg();
  addListenerThumbnailImg();
  

  
const skewSetter = gsap.quickSetter(".hover-shadow", "skewY", "deg");
const proxy = { skew: 0 }

ScrollTrigger.create({
	onUpdate: self => {
		const skew = self.getVelocity() / -800;
		// console.log(skew);
		if (Math.abs(skew) > Math.abs(proxy.skew)) {
			proxy.skew = skew;
			gsap.to(proxy, {
				skew: 0,
				duration: 0.5,
				ease: "power3",
				overwrite: true,
				onUpdate: () => skewSetter(proxy.skew)
			})
		}
	}
});

// ==================== COMMENTS =====================

// // OPEN MODAL
// const openModal = () => {
//   document.getElementById("modal").style.display = "flex";
// }

// // CLOSE MODAL
// const closeModal = () => {
//   const modal = document.getElementById("modal");
//   modal.classList.add("fade-out");
//   // FADE OUT AND HIDE WHEN TRANSPARENT
//   setTimeout(function () {
//     modal.classList.remove("fade-out");
//         modal.style.display = "none";

//       }, 950);
// }

// //   SLIDE INDEX
// let slideIndex = 1;

// // NEXT / PREV ARROWS
// const plusSlides = (n) => {
//   showSlides(slideIndex += n);
// }

// const currentSlide = (n) => {
//   showSlides(slideIndex = n);

//   // !!!!! TEMPORARY FIX FOR imageCounterDivs.textContent: !!!!!
//   const imageCounterDivs = document.getElementsByClassName("image-counter-div");
//   trimmedString = "";
//   for (let i = 0; i < imageCounterDivs.length; i++) {
//     // console.log(imageCounterDivs[i].textContent.substring(0,4));
//     // 1 / 4444444  => 1 /
//     trimmedString = imageCounterDivs[i].textContent.substring(0,4);
//     // 1 /   + NUMBER OF GALLERY IMAGES  => 1 / 4
//     imageCounterDivs[i].textContent = trimmedString.concat(numberOfFoundImages);

//   }
// }


// //  RETREIVE IMAGE FOLDER NAME AND IMAGE NAME FROM CATEGORY TITLE
// const getCategoryName = () => {
//   //   console.log(document.querySelector(".category-title").innerHTML);
//   return document.querySelector(".category-title").innerHTML;
// }


// // ========== CATEGORY GALLERY ==========

// // CREATE GALLERY DIVS WITH IMAGES
// const galleryImgContainer = document.querySelector(".gallery-img-container");

// const createGallery = (n) => {
//   const galleryDiv = document.createElement("div");
//   galleryDiv.className = "gallery-div";
//   galleryImgContainer.appendChild(galleryDiv);

//   const galleryDivImg = document.createElement("img");
//   galleryDivImg.className = ("hover-shadow");
//   galleryDivImg.src = `images/${getCategoryName()}/${getCategoryName()}-${n}.jpg`;

//   galleryDivImg.onerror = function () {
//     console.log('error loading ' + this.src);
//     // !!!!! HAVE TO REMOVE PARENT (CONTAINER DIV) !!!!!
//     this.parentElement.remove();
//     // this.style.display = "none";
//     // this.className = "invalid-img-source";
//     // this.remove();
//     // place your error.png image instead
//     // this.src = 'error.png'; 
//     };
//    galleryDiv.appendChild(galleryDivImg);
// }



// // ========== ADD openModal() and currentSlide(n) TO GALLERY IMAGES (<img src="../images/nature-1.jpg" onclick="openModal();currentSlide(1)" class="hover-shadow">) ==========
// const addListenerGalleryImg = () => {
//   const galleryImages = document.getElementsByClassName("hover-shadow");

//   for (let i = 0; i < galleryImages.length; i++) {
//     galleryImages[i].addEventListener("click", openModal, false);
//     // !!!!! NO NEED FOR THIS: !!!!!
//     // galleryImages[i].addEventListener("click", getNumberOfImages, false);
//     galleryImages[i].addEventListener('click', function(index) { 
//       return function () {
//         currentSlide(Number(index + 1));
//       };
//     }(i), true);
//   }
// }

// // ========== CREATE MODAL DIVS WITH IMAGE-COUNTER AND IMAGES ==========


// // !!!!!!!!!!!!!!!!!!!!!!!!!! THIS IS WORKING IN CONSOLE BUT IN createModal ITS RETURN VALUE IS undefined !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// // COUNT NUMBER OF FOUND GALLERY IMAGES/DIVS IN GALLERY
// // CALLED IN currentSlide() AFTER GALLERY IMAGES HAVE BEEN RENDERED

// let numberOfFoundImages = 0;
// // console.log("initial value: " + numberOfFoundImages);
// const getNumberOfImages = () => {
//   // console.log("gallery clicked");
//   const galleryDivs = document.getElementsByClassName("gallery-div");
//   // !!!!!!!! THIS IS TOTAL IMAGES COUNT FOR NUMBERTEXT DISPLAY, NOT WORKING IN createModal() !!!!!!!!!!
//   numberOfFoundImages = galleryDivs.length;
//   console.log("FOUND IMAGES: " + numberOfFoundImages);
//   return numberOfFoundImages;
// }

// // GET IMAGE COUNT AFTER PAGE IS LOADED
// window.onload = getNumberOfImages;

// const createModal = (n) => {
//   const modalImgContainer = document.querySelector(".modal-img-container");

//   const modalDiv = document.createElement("div");
//   modalDiv.className = "modal-img-div";
//   modalImgContainer.appendChild(modalDiv);

//   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   const imageCounterDiv = document.createElement("div");
//   imageCounterDiv.className = ("image-counter-div");
//   // !!!!! THESE DON'T WORK !!!!!
//   // imageCounterDiv.textContent = index + " / " + numberOfFoundImages;
//   // imageCounterDiv.textContent = n + " / " + numberOfFoundImages;

//   // !!!!! TEMPORARY FIX: CONCAT NUMBER OF GALLERY IMAGES TO END OF STRING IN currentSlide() !!!!!
//   imageCounterDiv.textContent = n + " / ";
//   modalDiv.appendChild(imageCounterDiv);
//   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//   const modalDivImg = document.createElement("img");
//   modalDivImg.className = ("modal-img");
//   modalDivImg.src = `images/${getCategoryName()}/${getCategoryName()}-${n}.jpg`;

//   modalDivImg.onerror = function () {
//     // console.log('error loading ' + this.src);
//     this.style.display = "none";
//     // !!!!! HAVE TO REMOVE PARENT (CONTAINER DIV) !!!!!
//     this.parentElement.remove();
//     // this.remove();
//     // place your error.png image instead
//     // this.src = 'error.png'; 
//   };
//   modalDiv.appendChild(modalDivImg);
// }

// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// // ========== CREATE THUMBNAIL DIVS WITH IMAGES ==========
// const createThumbnail = (n) => {
//   const thumbnailContainer = document.querySelector(".thumbnail-container");
    
//     const thumbnailDiv = document.createElement("div");
//     thumbnailDiv.className = "thumbnail-div";
//     thumbnailContainer.appendChild(thumbnailDiv);
  
//     const thumbnailDivImg = document.createElement("img");
//     thumbnailDivImg.className = ("thumbnail-image");
//     thumbnailDivImg.src = `images/${getCategoryName()}/${getCategoryName()}-${n}.jpg`;
   
//     thumbnailDivImg.onerror = function () {
//       // console.log('error loading ' + this.src);
//       // this.style.display = "none";
//       this.parentElement.remove();
//       // this.className = "invalid-img-source";
//       // this.remove();
//       // place your error.png image instead
//       // this.src = 'error.png'; 
//   };
//   thumbnailDiv.appendChild(thumbnailDivImg);
// }


// // ========== ADD currentslide(n) TO THUMBNAIL IMAGES ==========
// function addListenerThumbnailImg(){
//   const thumbnailImages = document.getElementsByClassName("thumbnail-image");
  
//   for (let i = 0; i < thumbnailImages.length; i++) {
//     thumbnailImages[i].addEventListener('click', function(index) { 
//       return function () {
//         currentSlide(Number(index + 1));
//       };
//     }(i), true);
//   }
// }

// //  ========== LOOP WILL CHECK FOR maxIndex NUMBER OF IMAGES IN FOLDER ==========
// let index = 1;
// const maxIndex = 5;
// while (index < maxIndex + 1) {
//   // console.log(index);
//   createGallery(index);
//   createModal(index);
//   createThumbnail(index);
//   index++;
// }

// const showSlides = (n) => {
//   let i;
//   const modalImageDivs = document.getElementsByClassName("modal-img-div");
//   const thumbnailImages = document.getElementsByClassName("thumbnail-image");
//   // var captionText = document.getElementById("caption");
//   if (n > modalImageDivs.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = modalImageDivs.length}
//   for (i = 0; i < modalImageDivs.length; i++) {
//     modalImageDivs[i].style.display = "none";
//   }
//   for (i = 0; i < thumbnailImages.length; i++) {
//     thumbnailImages[i].className = thumbnailImages[i].className.replace(" active", "");
//   }
//   modalImageDivs[slideIndex-1].style.display = "block";
//   thumbnailImages[slideIndex-1].className += " active";
//   // captionText.innerHTML = dots[slideIndex-1].alt;
// }

// showSlides(slideIndex);
// addListenerGalleryImg();
// addListenerThumbnailImg();


// !!!!!!!!!! THESE DONT WORK IN CREATEDIV LOOPS !!!!!!!!!!
  
  //   thumbnailDivImg.onclick = currentSlide(Number(index));
  //   thumbnailDivImg.addEventListener("click", currentSlide(Number(index)));
  
  // !!!!!!!!!! SOLUTION !!!!!!!!!!
  
  // How to properly pass argument in loop to multiple event handlers? CREATE A CLOSURE
  // https://stackoverflow.com/questions/12330607/how-to-properly-pass-argument-in-loop-to-multiple-event-handlers
  
  // eventName: String that specifies the name of the event to listen for. This parameter is case sensitive!
  // function: Represents the event listener function to be called when the event occurs. When an event occurs, an event object is initialized and passed to the event handler as the first parameter. The type of the event object depends on the current event.
  // useCapture: Boolean that specifies whether the event needs to be captured or not. One of the following values:
  
  // false -> Register the event handler for the bubbling phase. 
  // true -> Register the event handler for the capturing phase.
  // Bubbling and Capturing Phases:
  
  // bubbling: the event object propagates through the target's ancestors in reverse order, starting with the target's parent and ending with the defaultView. This phase is also known as the bubbling phase. Event listeners registered for this phase must handle the event after it has reached its target.
  
  // capturing: the event object must propagate through the target's ancestors from the defaultView to the target's parent. This phase is also known as the capturing phase. Event listeners registered for this phase must handle the event before it reaches its target.
  
  
  // ========== ADD openModal() and currentSlide(n) TO GALLERY IMAGES (<img src="../images/nature-1.jpg" onclick="openModal();currentSlide(1)" class="hover-shadow">) ==========
  // const addListenerGalleryImg = () => {
  //   const galleryImages = document.getElementsByClassName("hover-shadow");
  
  //   for (let i = 0; i < galleryImages.length; i++) {
  //     galleryImages[i].addEventListener("click", openModal, false);
  //     galleryImages[i].addEventListener('click', function(index) { 
  //       return function () {
  //         currentSlide(Number(index + 1));
  //       };
  //     }(i), true);
  //   }
  // }
  
  // addListenerGalleryImg();
  
  
  
  