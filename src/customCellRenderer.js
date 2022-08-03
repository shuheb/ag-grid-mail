class CustomCellRenderer {
    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = '<span><img src="https://flags.fmcdn.net/data/flags/mini/gb.png" style="width: 20px; padding-right: 4px;"/>' +
            params.value +
            '</span>';

    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        throw new Error("Method not implemented.");
    }
}

export default CustomCellRenderer;