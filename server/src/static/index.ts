const buttons: any = document.querySelectorAll('button')
for (const button of buttons) {
    const contentBlock: any = button.closest('div').nextElementSibling
    button.onclick = () => (contentBlock.getBoundingClientRect().height === 0) ? contentBlock.classList.add('show') : contentBlock.classList.remove('show')
}

const requests: any = document.querySelectorAll('.request-header')
for (const request of requests) {
    const content = request.nextElementSibling
    request.onclick = () => {
        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('very-big')) {
            content.classList.add('show-very-big')
        } else {
            content.classList.remove('show-very-big')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('big')) {
            content.classList.add('show-big')
        } else {
            content.classList.remove('show-big')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('medium')) {
            content.classList.add('show-medium')
        } else {
            content.classList.remove('show-medium')
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

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('registration')) {
            content.classList.add('show-registration')
        } else {
            content.classList.remove('show-registration')
        }

        if (content.getBoundingClientRect().height === 0 && content.hasAttribute('login')) {
            content.classList.add('show-login')
        } else {
            content.classList.remove('show-login')
        }
    }
}