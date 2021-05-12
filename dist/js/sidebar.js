window.addEventListener('load', () => {
    const toggleDataAttr = (node, attr) => {
        if (node.dataset[attr]) {
            delete node.dataset[attr];
        } else {
            node.dataset[attr] = 'true';
        }
    };

    const syncExpanded = (node) => {
        if (node.dataset.expanded) {
            node.parentElement.querySelector('.toc-list-2').style.display = 'block';
        } else {
            node.parentElement.querySelector('.toc-list-2').style.display = 'none';
        }
    };

    const toggleExpanded = (node) => {
        toggleDataAttr(node, 'expanded');
        syncExpanded(node);
    };

    const syncSelected = (node) => {
        let indicator = node.parentElement.querySelector(':scope > .toc-indicator-2');
        if (node.dataset.selected) {
            node.style.color = '#02DAC9';
            if (indicator) {
                indicator.style.display = 'block';
            }
        } else {
            node.style.color = '#FFFFFF';
            if (indicator) {
                indicator.style.display = 'none';
            }
        }
    };

    const toggleSelected = (node) => {
        let prevNode = document.querySelector('.toc-text-1[data-selected="true"], .toc-text-2[data-selected="true"]');
        if (prevNode) {
            toggleDataAttr(prevNode, 'selected');
            syncSelected(prevNode);
        }
        toggleDataAttr(node, 'selected');
        syncSelected(node);
    };

    let node = document.querySelector(`.toc a[href="${window.location.hash}"]`);
    if (node) {
        let parentNode = node;
        while (parentNode) {
            parentNode = parentNode.parentElement
            let expandNode = parentNode.querySelector('.toc-text-1');
            if (expandNode) {
                toggleExpanded(expandNode);
                break;
            }
        }
        toggleSelected(node);
    }

    document.querySelectorAll('.toc-text-1').forEach(node => {
        node.addEventListener('click', () => {
            if (node.dataset.selected || !node.dataset.expanded) {
                toggleExpanded(node);
            }
            toggleSelected(node);
        });
    });
    document.querySelectorAll('.toc-text-2').forEach(node => {
        node.addEventListener('click', () => {
            toggleSelected(node);
        });
    });
});
