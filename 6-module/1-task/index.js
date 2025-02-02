/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.renderTable();
  }

  renderRemoveRowButton(tr) {
    const button = document.createElement('button');
    button.innerHTML = 'X';
    button.onclick = () => tr.remove();
    return button;
  }

  renderBodyCell(cellText) {
    const td = document.createElement('td');
    td.innerHTML = cellText;
    return td;
  }

  renderBodyRow(row) {
    const tr = document.createElement('tr');
    for (const cell in row) {
      if (row.hasOwnProperty(cell)) {
        tr.append(this.renderBodyCell(row[cell]));
      }
    }
    const tdButton = document.createElement('td');
    tdButton.append(this.renderRemoveRowButton(tr));
    tr.append(tdButton);
    return tr;
  }

  renderBody() {
    const tBody = document.createElement("tbody");
    this.rows.map((row) => tBody.append(this.renderBodyRow(row)));
    return tBody;
  }

  renderHeadColumn(nameColumn) {
    const th = document.createElement('th');
    th.innerHTML = nameColumn;
    return th;
  }

  getColumns() {
    return ['Имя', 'Возраст', 'Зарплата', 'Город', ''];
  }

  renderHeadColumns(trHead) {
    return this.getColumns().map((nameColumn) => trHead.append(this.renderHeadColumn(nameColumn)));
  }

  renderHead() {
    const tHead = document.createElement("thead");
    const trHead = document.createElement("tr");
    tHead.append(trHead);
    this.renderHeadColumns(trHead);
    return tHead;
  }

  renderTable() {
    const table = document.createElement("table");
    table.append(this.renderHead(), this.renderBody());
    return table;
  }
}
