document.querySelector(".leftImage-1").addEventListener("mouseover", function() {
    var imageName = this.alt; 
    document.querySelector(".select-1 option").textContent = imageName; 
});

document.querySelector(".left-image2").addEventListener("mouseover", function() {
    var imageName = this.alt; 
    document.querySelector(".select-1 option").textContent = imageName; 
});
