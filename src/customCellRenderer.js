class CustomCellRenderer {

    init(params) {
        this.params = params;
        this.eGui = document.createElement('div');
        this.eGui.classList.add('renderer-container');
        this.eText = document.createElement('div');
        this.eText.innerText = params.value;
        this.eGui.appendChild(this.eText);
        this.eActionContainer = document.createElement('div');
        this.eActionContainer.classList.add('action-container');
        this.eGui.appendChild(this.eActionContainer);

        this.eActionContainer.innerHTML = `
        <svg data-action="read" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z"/></svg>
        <svg data-action="unread" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.99 8c0-.72-.37-1.35-.94-1.7l-8.04-4.71c-.62-.37-1.4-.37-2.02 0L2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zm-11.05 4.34l-7.2-4.5 7.25-4.25c.62-.37 1.4-.37 2.02 0l7.25 4.25-7.2 4.5c-.65.4-1.47.4-2.12 0z"/></svg>
        <svg data-action="delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
        `;

        const children = this.eActionContainer.querySelectorAll('svg');
        children.forEach(child => {
            child.addEventListener('click', this.onClicked.bind(this))
        })

    }

    onClicked(ev) {
        const action = ev.currentTarget.dataset.action;
        switch (action) {
            case 'read':
                console.log('read')
                break;
            case 'unread':
                console.log('unread')
                break;
            case 'delete':
                
                break;
        }
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        throw new Error("Method not implemented.");
    }
}

export default CustomCellRenderer;