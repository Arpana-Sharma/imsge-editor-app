const image = document.getElementById("image");
const show = document.querySelectorAll(".show");
const flipHor = document.getElementById("hrFlip");
const flipVr = document.getElementById("vrFlip");
const rc = document.getElementById("rc");
const rac = document.getElementById("arc");
const reset = document.getElementById("resetImg");
const brightness = document.getElementById("brightness");
const invert = document.getElementById("invert");
const saturation = document.getElementById("saturation");
const gray = document.getElementById("gray");
const myFile = document.getElementById("myFile");

var h = -1;
var v = -1;
var cw = 1;
var acw = 1;
function changeBr(x) {
    image.style.filter = `brightness(${x}%) invert(${invert.value}%) saturate(${saturation.value}%) grayscale(${gray.value}%)`;
    show[0].innerHTML = `${x}%`;
}
function changeInv(x) {
    image.style.filter = `brightness(${brightness.value}%) invert(${x}%) saturate(${saturation.value}%) grayscale(${gray.value}%)`;
    show[1].innerHTML = `${x}%`;
}
function changeSat(x) {
    image.style.filter = `brightness(${brightness.value}%) invert(${invert.value}%) saturate(${x}%) grayscale(${gray.value}%)`;
    show[2].innerHTML = `${x}%`;
}
function changeGr(x) {
    image.style.filter = `brightness(${brightness.value}%) invert(${invert.value}%) saturate(${saturation.value}%) grayscale(${x}%)`;
    show[3].innerHTML = `${x}%`;
}
var loadFile = function(event) {
    reset.click();
	var image = document.getElementById("image");
	image.src = URL.createObjectURL(event.target.files[0]);
};
console.log(myFile);
flipHor.addEventListener("click", function () {
    image.style.transform = `scaleY(${h})`;
    h = h * (-1);
});
flipVr.addEventListener("click", function () {
    image.style.transform = `scaleY(${v})`;
    v = v * (-1);
});
rc.addEventListener("click", function () {
    let a = 90 * cw % 360
    image.style.transform = `rotate(${a}deg)`;
    cw++;
});
rac.addEventListener("click", function () {
    let b = -90 * cw % 360
    image.style.transform = `rotate(${b}deg)`;
    cw++;
});
reset.addEventListener("click", function () {
    image.style.filter = `brightness(100%)`;
    show[0].innerHTML = `100%`;
    image.style.filter = `invert(0%)`;
    show[1].innerHTML = `0%`;
    image.style.filter = `saturate(100%)`;
    show[2].innerHTML = `100%`;
    image.style.filter = `grayscale(0%)`;
    show[3].innerHTML = `0%`;
    brightness.value = 100;
    invert.value = 0;
    saturation.value = 100;
    gray.value = 0;
});

const downloader = document.getElementById("download");
const Anchor = document.getElementById("anchord");
downloader.addEventListener("click", function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    ctx.filter = `brightness(${brightness.value}%) saturate(${saturation.value}%) invert(${invert.value}%) grayscale(${gray.value}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    let rotate = cw-acw;
    if(rotate != 0) {
        console.log(cw,acw,rotate);
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(-h, -v);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    Anchor.href = canvas.toDataURL();
    Anchor.download = "woman.jpg";
    document.getElementById("silentBtn").click();
    Anchor.href = "";
    Anchor.download = "";
    console.log(Anchor.href);
});