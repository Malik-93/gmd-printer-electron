let { remote } = require("electron");
// console.log(process.versions.electron);

const { PosPrinter, } = remote.require("electron-pos-printer");
// const {PosPrinter} = require("electron-pos-printer"); //dont work in production (??)

const path = require("path");

let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters(); //list the printers

printers.filter(p => p.name.toLowerCase().includes("rollo")).map((item, index) => {
  //write in the screen the printers for choose
  document.getElementById("list_printers").innerHTML += `
  <div style="display: flex;align-items: center;">
  <p id=printer_${index}>${item.name}</p> 
  <input onclick="print()" type="button" value="print" style="margin-left: 10px" />
  </div>`;
});

function print() {
  let printerName = 'Rollo X1060';

  var p = document.getElementsByName("printer");


  const options = {
    preview: true, // Preview in window or print
    width: '200px', //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
    pageSize: { height: window.screen.height * .5, width: window.screen.width * .5 }  // page size

  };

  const now = {
    type: "text",
    value: "" + Date.now(),
    style: { "font-size": "12px", "text-align": "center", "font-family": "sans-serif" },
  };
  const data = [
    {
      type: 'image',
      url: 'https://randomuser.me/api/portraits/men/43.jpg',     // file path
      position: 'center',                                  // position of image: 'left' | 'center' | 'right'
      // width: '160px',                                           // width of image in px; default: auto
      // height: '60px',                                          // width of image in px; default: 50 or '50px'
    },
    // {
    //   type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    //   value: 'SAMPLE HEADING',
    //   style: { fontWeight: "700", textAlign: 'center', fontSize: "24px" }
    // }, 
    // {
    //   type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    //   value: 'Secondary text',
    //   style: { textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red" }
    // }, {
    //   type: 'barCode',
    //   value: '023456789010',
    //   height: 40,                     // height of barcode, applicable only to bar and QR codes
    //   width: 2,                       // width of barcode, applicable only to bar and QR codes
    //   displayValue: true,             // Display value below barcode
    //   fontsize: 12,
    // }, {
    //   type: 'qrCode',
    //   value: 'https://github.com/Hubertformin/electron-pos-printer',
    //   height: 55,
    //   width: 55,
    //   style: { margin: '10 20px 20 20px' }
    // }, {
    //   type: 'table',
    //   // style the table
    //   style: { border: '1px solid #ddd' },
    //   // list of the columns to be rendered in the table header
    //   tableHeader: ['Animal', 'Age'],
    //   // multi dimensional array depicting the rows and columns of the table body
    //   tableBody: [
    //     ['Cat', 2],
    //     ['Dog', 4],
    //     ['Horse', 12],
    //     ['Pig', 4],
    //   ],
    //   // list of columns to be rendered in the table footer
    //   tableFooter: ['Animal', 'Age'],
    //   // custom style for the table header
    //   tableHeaderStyle: { backgroundColor: '#000', color: 'white' },
    //   // custom style for the table body
    //   tableBodyStyle: { 'border': '0.5px solid #ddd' },
    //   // custom style for the table footer
    //   tableFooterStyle: { backgroundColor: '#000', color: 'white' },
    // }, {
    //   type: 'table',
    //   style: { border: '1px solid #ddd' },             // style the table
    //   // list of the columns to be rendered in the table header
    //   tableHeader: [{ type: 'text', value: 'People' }, { type: 'image', path: path.join(__dirname, 'icons/animal.png') }],
    //   // multi-dimensional array depicting the rows and columns of the table body
    //   tableBody: [
    //     [{ type: 'text', value: 'Marcus' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/43.jpg' }],
    //     [{ type: 'text', value: 'Boris' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/41.jpg' }],
    //     [{ type: 'text', value: 'Andrew' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/23.jpg' }],
    //     [{ type: 'text', value: 'Tyresse' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/53.jpg' }],
    //   ],
    //   // list of columns to be rendered in the table footer
    //   tableFooter: [{ type: 'text', value: 'People' }, 'Image'],
    //   // custom style for the table header
    //   tableHeaderStyle: { backgroundColor: 'red', color: 'white' },
    //   // custom style for the table body
    //   tableBodyStyle: { 'border': '0.5px solid #ddd' },
    //   // custom style for the table footer
    //   tableFooterStyle: { backgroundColor: '#000', color: 'white' },
    // },
  ]

  const d = [...data, now];

  if (printerName) {
    PosPrinter.print(d, options)
      .then(() => { })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Select the printer and the width");
  }
}
