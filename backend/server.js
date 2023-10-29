const express = require("express")
const app = express()
const multer = require("multer")
app.use(express.json())
const { PdfDataParser } = require("pdf-data-parser"); 
const fs = require("fs")
app.use(express.static('./public'))

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
            let impactWord = `<strong>${word.slice(0,(Math.floor(word.length/2)))}</strong>`
            let mainWord = word.split(word.slice(0,(Math.floor(word.length/2))))[1]
            
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

app.post("/speedread", (req,res)=> {

    upload(req, res,  async function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
           const filer = req.file


            let parser = new PdfDataParser({url: filer.path});
            (async function convert() {
                var rows = await parser.parse()
    
                res.json(convertToBionicRead(rows[0][0]))
            })()

          
    })
})

app.listen(3000, ()=> {
    console.log("Server Started at 3000")
})