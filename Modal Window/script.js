'use strict';

const btnShowModel = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".close");

const displayModal = function(){
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

const closeModal = function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

btnShowModel.forEach((btn) => {
    btn.addEventListener("click", displayModal);
});

btnClose.addEventListener("click", closeModal);

document.addEventListener("keydown",function(e){
    if(e.key === "Escape" && !modal.classList.contains("hidden")){
        closeModal();
    }
});