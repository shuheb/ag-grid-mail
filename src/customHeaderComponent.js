class CustomHeader {
    init(params) {
        this.params = params;
        this.eGui = document.createElement('div');
        this.eGui.style = 'display:flex; align-items:center;'
        this.eGui.innerHTML = `
              <div class="customHeaderMenuButton">
                  <i class="fa ${this.params.menuIcon}"></i>
              </div>
              <div class="customHeaderLabel">${this.params.displayName}</div>
          `;

        params.api.addEventListener('selectionChanged', this.onSelectedChanged.bind(this));

        this.eMenuButton = this.eGui.querySelector('.customHeaderMenuButton');
    }

    onSelectedChanged(params) {
        const rowCount = params.api.rowModel.rootNode.allChildrenCount;
        const selectedRowsCount = params.api.getSelectedRows().length;
        const headerCheckbox = this.eGui.parentNode.parentNode.querySelector('.ag-checkbox > .ag-checked');

        if (headerCheckbox) {
            this.eActionContainer = document.createElement('div');
            this.eActionContainer.innerHTML = '<span data-action="delete" class="material-icons">delete</span><span data-action="unread" class="material-icons">markunread</span>';
            this.eActionContainer.style = 'display:flex; justify-content:center;margin-left:auto; color:black; gap:16px;'
            const children = this.eActionContainer.querySelectorAll('span');
            children.forEach(child => {
                child.addEventListener('click', this.onClicked.bind(this))
            });

            this.eGui.appendChild(this.eActionContainer)
        };

        if (selectedRowsCount < rowCount) {
            this.eGui.removeChild(this.eActionContainer)
        }
    }

    onClicked(ev) {
        const action = ev.currentTarget.dataset.action;
        const headerCheckbox = this.eGui.parentNode.parentNode.querySelector('.ag-checkbox > .ag-checked');
        const rowData = [];
        this.params.api.forEachNode(({ data }) => {
            data.read = !data.read;
            rowData.push(data)
        });
        if (headerCheckbox && rowData.length > 0) {
            switch (action) {
                case 'read':
                    this.eActionContainer.innerHTML = '<span data-action="delete" class="material-icons">delete</span><span data-action="unread" class="material-icons">markunread</span>'
                    this.addEventListenerOnButtons(this.eActionContainer, 'click', this.onClicked.bind(this));
                    this.params.api.applyTransaction({
                        update: rowData
                    });
                    this.params.api.refreshCells({ columns: ['title'], force: true });
                    break;
                case 'unread':
                    this.eActionContainer.innerHTML = '<span data-action="delete" class="material-icons">delete</span><span data-action="read" class="material-icons">drafts</span>'
                    this.addEventListenerOnButtons(this.eActionContainer, 'click', this.onClicked.bind(this));
                    this.params.api.applyTransaction({
                        update: rowData
                    });
                    this.params.api.refreshCells({ columns: ['title'], force: true });
                    break;
                case 'delete':
                    this.params.api.applyTransaction({
                        remove: rowData
                    })
                    break;
            }
        }
    }

    addEventListenerOnButtons(element, type, listener) {
        const children = element.querySelectorAll('span');
        children.forEach(child => {
            child.addEventListener(type, listener)
        })
    }

    getGui() {
        return this.eGui;
    }

    destroy() {

    }
}

export default CustomHeader;