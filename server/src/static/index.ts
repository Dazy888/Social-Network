const buttons: any = document.querySelectorAll('button')
for (const button of buttons) {
    button.onclick = () => {
        const contentBlock: any = button.closest('div').nextElementSibling

        if (contentBlock.getBoundingClientRect().height === 0) {
            contentBlock.classList.add('show')
        } else {
            contentBlock.classList.remove('show')
        }
    }
}

const requests: any = document.querySelectorAll('.request-header')
for (const request of requests) {
    request.onclick = () => {
        const content = request.nextElementSibling
        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('medium')) {
            content.classList.add('show-medium')
        } else {
            content.classList.remove('show-medium')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('big')) {
            content.classList.add('show-big')
        } else {
            content.classList.remove('show-big')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('small')) {
            content.classList.add('show-small')
        } else {
            content.classList.remove('show-small')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('very-small')) {
            content.classList.add('show-very-small')
        } else {
            content.classList.remove('show-very-small')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('name')) {
            content.classList.add('show-name')
        } else {
            content.classList.remove('show-name')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('location')) {
            content.classList.add('show-location')
        } else {
            content.classList.remove('show-location')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('settings')) {
            content.classList.add('show-settings')
        } else {
            content.classList.remove('show-settings')
        }
    }
}