import Table from 'tty-table';

const header = [
  {
    alias: 'Title',
    value: 'title',
    headerColor: 'blue',
    color: 'white',
    align: 'left',
    width: 100,
  },
  {
    alias: 'Is Available',
    value: 'isAvailable',
    color: 'blue',
    align: 'center',
    width: 15,
    formatter: function (value) {
      if (Boolean(value)) {
        return this.style(value, 'bgGreen', 'black');
      }
      return this.style(value, 'bgRed', 'white');
    },
  },
];

const options = {
  borderStyle: 'solid',
  borderColor: 'blue',
  headerAlign: 'center',
  align: 'left',
  color: 'white',
  truncate: '...',
  width: '90%',
};

const buildTable = rows => Table(header, rows, options);

export default buildTable;
