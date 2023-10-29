const express = require("express")
const app = express()
const multer = require("multer")
app.use(express.json())
const { PdfDataParser } = require("pdf-data-parser"); 
const fs = require("fs")
const cors = require("cors")
require('dotenv').config()
app.use(express.static('./public'))
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use(express.urlencoded({extended: false}))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
function convertToBionicRead(data) {
    let finalString = ""
    data = data.split(" ")
    for (let word of data) { 
        if (word.length > 1) {
            let impactWord = `<strong>${word.slice(0,(Math.ceil(word.length/2)))}</strong>`
            let mainWord = word.split(word.slice(0,(Math.ceil(word.length/2))))[1]
            
            let bionicWord = impactWord+mainWord
            finalString = finalString + bionicWord + " "

        } else {
            finalString = finalString + word + " "
        }
    }
    
    return ({"bionicRead": finalString}) }
var upload = multer({ storage: storage }).single('file')
app.post("/", (req,res)=> {
    if (req.body.content) {
        let data = req.body.content
        res.json(convertToBionicRead(data))
    } else {
        res.json("No Data In Request")
    }
})

app.get("/",(req,res)=> {
    res.json("Made by Shubham and Satvik")
})
app.post("/speedread", (req,res)=> {

    upload(req, res,  async function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
           const filer = req.file


            try {
            let parser = new PdfDataParser({url: filer.path});
            (async function convert() {
                let rows = await parser.parse()
                if (rows.length) {
                    fs.unlinkSync(filer.path)
                res.json(convertToBionicRead(rows[0][0]))
                } else {
                    res.json({"bionicRead":"Document Contains Complex Data, Try Another"})
                }
            })() } catch(e) {
                res.json("Can't Parse This Document, Try Another")
            }

          
    })
})

app.listen(process.env.PORT, ()=> {
    console.log(`Server Started at ${process.env.PORT}`)
})
