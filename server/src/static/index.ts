const buttons: any = document.querySelectorAll('button')
for (const button of buttons) {
    button.onclick = () => {
        const contentBlock: any = button.closest('div').nextElementSibling

        if (contentBlock.hasAttribute('big') && contentBlock.getBoundingClientRect().height === 0) {
            contentBlock.classList.add('show-big')
        } else if (contentBlock.hasAttribute('big') && contentBlock.getBoundingClientRect().height !== 0) {
            contentBlock.classList.remove('show-big')
        }

        if (contentBlock.hasAttribute('small') && contentBlock.getBoundingClientRect().height === 0) {
            contentBlock.classList.add('show-small')
        } else if (contentBlock.hasAttribute('small') && contentBlock.getBoundingClientRect().height !== 0) {
            contentBlock.classList.remove('show-small')
        }
    }
}