window.addEventListener('load', () => {
    const toggleDataAttr = (node, attr) => {
        if (node.dataset[attr]) {
            delete node.dataset[attr];
        } else {
            node.dataset[attr] = 'true';
        }
    };

    const toggleSelected = (node) => {
        let prevNode = document.querySelector('.toc-text[data-selected="true"]');
        if (prevNode) {
            toggleDataAttr(prevNode, 'selected');
        }
        toggleDataAttr(node, 'selected');
    };

    let node = document.querySelector(`.toc a[href="${window.location.hash}"]`);
    if (node) {
        toggleSelected(node);
    }

    document.querySelectorAll('.toc-text').forEach(node => {
        node.addEventListener('click', () => {
            toggleSelected(node);
        });
    });
});
