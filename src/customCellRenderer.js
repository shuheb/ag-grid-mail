class CustomCellRenderer {

    init(params) {
        this.params = params;
        this.eGui = document.createElement('div');
        this.eGui.classList.add('renderer-container');

        const date = params.data.pubDate.toDateString().split(' ');
        const month = date[1];
        const day = Number(date[2]);

        this.eGui.innerHTML = `
        <div class="tag-container">
          <span>${params.data.category === 'aggrid' ? 'ag-grid' : params.data.category}</span>
        </div>
        <div class="text-container">${params.value}</div> - <div class="text-description">
        ${params.data.description.replace(/(<([^>]+)>)/g, "").substring(0, 200)}
        </div>
        <div class="action-container">
          <span data-action="delete" class="material-icons">delete</span>
        </div>
        <div class="date-label">${day} ${month}</div>
        `;

        this.eActionContainer = this.eGui.querySelector('.action-container');
        this.eActionContainer.style.display = 'none';
        this.eDateLabel = this.eGui.querySelector('.date-label');

        if (params.data.read) {
            this.eActionContainer.innerHTML += '<span data-action="unread" class="material-icons">markunread</span>';
        } else {
            this.eActionContainer.innerHTML += '<span data-action="read" class="material-icons">drafts</span>';
        };

        this.addEventListenerOnButtons(this.eActionContainer, 'click', this.onClicked.bind(this));

    }

    getGui() {
        return this.eGui;
    }

    destroy() {
    }

    showRenderer() {
        this.eActionContainer.style.display = '';
        this.eDateLabel.style.display = 'none';
    }

    hideRenderer() {
        this.eActionContainer.style.display = 'none';
        this.eDateLabel.style.display = '';
    }

    refresh(params) {
        if (params.data.read) {
            this.eActionContainer.innerHTML = '<span data-action="delete" class="material-icons">delete</span><span data-action="unread" class="material-icons">markunread</span>';
            this.addEventListenerOnButtons(this.eActionContainer, 'click', this.onClicked.bind(this));
        } else {
            this.eActionContainer.innerHTML = '<span data-action="delete" class="material-icons">delete</span><span data-action="read" class="material-icons">drafts</span>';
            this.addEventListenerOnButtons(this.eActionContainer, 'click', this.onClicked.bind(this));
        }
        return true;
    }

    onClicked(ev) {
        const action = ev.currentTarget.dataset.action;

        switch (action) {
            case 'read':
                this.params.data.read = !this.params.data.read;
                this.params.api.applyTransaction({ update: [this.params.data] });
                this.params.api.refreshCells({ rowNodes: [this.params.node], columns: [this.params.column], force: true });
                break;
            case 'unread':
                this.params.data.read = !this.params.data.read;
                this.params.api.applyTransaction({ update: [this.params.data] });
                this.params.api.refreshCells({ rowNodes: [this.params.node], columns: [this.params.column], force: true });
                break;
            case 'delete':
                this.params.api.applyTransaction({
                    remove: [this.params.data]
                })
                break;
        }
    }

    addEventListenerOnButtons(element, type, listener) {
        const children = element.querySelectorAll('span');
        children.forEach(child => {
            child.addEventListener(type, listener)
        })
    }
}

export default CustomCellRenderer;