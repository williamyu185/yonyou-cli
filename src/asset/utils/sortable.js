import Sortable from 'sortablejs';

let sortableBundle = function(id, callback, sortHandle = '.dragSortIcon', dataKey = 'data-row-id') {
    let tbody = document.querySelector(id + ' .el-table__body-wrapper tbody');
    return new Sortable(tbody, {
        sort: true,
        handle: sortHandle,
        onEnd: (event) => {
            let dragSortIcon = tbody.querySelectorAll(sortHandle);
            let len = dragSortIcon.length;
            let ids = [];
            for(let i=0; i<len; i++) {
                ids.push({
                    id: dragSortIcon[i].attributes[dataKey].nodeValue,
                    seqno: (i + 1)
                });
            }
            callback(ids);
        },
        animation: 150
    });
};

export default sortableBundle;