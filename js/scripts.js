// document.designMode = "on"
const iframe = document.querySelector('#pawsmenu iframe')
iframe.setAttribute('width', innerWidth)
iframe.setAttribute('height', innerHeight)
console.log(iframe);
document.body.onresize = () => {
    iframe.setAttribute('width', innerWidth)
    iframe.setAttribute('height', innerHeight)
}