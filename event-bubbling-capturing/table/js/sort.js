'use strict';

function handleTableClick(event) {
  if (event.target.classList.contains('prop__name')) {
  	const fieldToSort = event.target.dataset.propName;
    event.target.dataset.dir = (!event.target.dataset.dir) ? 1 : event.target.dataset.dir * -1;
    event.currentTarget.dataset.sortBy = fieldToSort;
    sortTable(fieldToSort, event.target.dataset.dir);
  }    
}
