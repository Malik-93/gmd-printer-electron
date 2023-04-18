let { remote } = require("electron");
// console.log(process.versions.electron);

const { PosPrinter, } = remote.require("electron-pos-printer");
// const {PosPrinter} = require("electron-pos-printer"); //dont work in production (??)

const path = require("path");

let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters().filter(p => p.name.toLowerCase().includes("rollo")); //list the printers
console.log(printers);

printers.map((item, index) => {
  //write in the screen the printers for choose
  document.getElementById("list_printers").innerHTML += `
  <div style="display: flex;align-items: center;">
  <p id=printer_${index}>${item.name}</p> 
  <input onclick="print(false,${index})" type="button" value="print" style="margin-left: 10px" />
  <input onclick="print(true,${index})" type="button" value="preview" style="margin-left: 10px" />
  </div>`;
});
function print(preview = false, index = 0) {
  try {
    let printerName = printers[index].name;
    console.log(preview, printerName);
    const options = {
      preview: preview, // Preview in window or print
      width: '200px', //  width of content body
      margin: "0 0 0 0", // margin of content body
      copies: 1, // Number of copies to print
      printerName: printerName, // printerName: string, check it at webContent.getPrinters()
      timeOutPerLine: 400,
      silent: true,
      pageSize: { height: window.screen.height * .5, width: window.screen.width * .5 }  // page size

    };

    
    const data = [
      {
        type: 'image',
        url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/279fb0d0-b666-4cda-aec9-d53b8dd2853e/everyday-plus-cushioned-training-ankle-socks-6-pairs-xql9Hn.png',     // file path
        position: 'center',                                  // position of image: 'left' | 'center' | 'right'
        width: '250px',                                           // width of image in px; default: auto
        height: '250px',                                          // width of image in px; default: 50 or '50px'
      },
      {
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: 'SAMPLE HEADING',
        style: { fontWeight: "500", textAlign: 'center', fontSize: "18px" }
      },
      {
        type: 'barCode',
        value: '649241530138',
        height: 40,                     // height of barcode, applicable only to bar and QR codes
        width: 2,                       // width of barcode, applicable only to bar and QR codes
        displayValue: true,             // Display value below barcode
        fontsize: 12,
      },
      // {
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
    const d = [...data];
    PosPrinter.print(d, options)
      .then((res) => {
        if (!preview)
          alert(`Print success: ${JSON.stringify(res)}`)
      })
      .catch((error) => {
        console.error(error);
        if (!preview)
          alert(`Print Error! ${JSON.stringify(error)}`)
      });
  }
  catch (error) {

  }
}
