

const full = window.location.host
const parts = full.split('.')
const sub = parts[0]

console.log(sub)


const iframe_container = document.querySelector('.iframe-bg')

console.log(iframe_container)

if (sub.length > 0) {
    // if there is a subdomain
    const url = 'https://www.' + sub + '.com';
    let iframe = document.createElement('iframe');
    iframe.src = url;
    iframe_container.appendChild(iframe);
}