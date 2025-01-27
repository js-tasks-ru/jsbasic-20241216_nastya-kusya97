function highlight(table) {
  const head = table.tHead;
  const headRows = head.rows;
  const headCells = headRows[0].cells;
  let indexStatus = '';
  let indexGender = '';
  let indexAge = '';
  for (let headCell of headCells) {
    if (headCell.innerHTML === 'Status') indexStatus = headCell.cellIndex;
    if (headCell.innerHTML === 'Gender') indexGender = headCell.cellIndex;
    if (headCell.innerHTML === 'Age') indexAge = headCell.cellIndex;
  }

  const rows = table.tBodies[0].rows;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.cells;

    if (cells[indexGender].innerHTML === 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }

    if (cells[indexAge].innerHTML < 18) {
      row.style.textDecoration = 'line-through';
    }

    const isAttributeAvailable = cells[indexStatus].dataset.available;
    if (!!isAttributeAvailable) {
      isAttributeAvailable === 'true' ? row.classList.add('available') : row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }
  }
}
