const buttons = document.querySelectorAll('button');
for (const button of buttons) {
    const contentBlock = button.closest('div').nextElementSibling;
    button.onclick = () => (contentBlock.getBoundingClientRect().height === 0) ? contentBlock.classList.add('show') : contentBlock.classList.remove('show');
}
const requests = document.querySelectorAll('.request-header-section');
for (const request of requests) {
    const content = request.nextElementSibling;
    request.onclick = () => (content.getBoundingClientRect().height === 0) ? content.classList.add('show-content') : content.classList.remove('show-content');
}
//# sourceMappingURL=index.js.map