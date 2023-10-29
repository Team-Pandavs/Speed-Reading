const express = require("express");
const app = express()

app.use(express.json())

app.post("/", (req,res)=> {
    if (req.body.content) {
        let data = req.body.content
        let finalString = ""
        data = data.split(" ")
        for (word of data) { 
            if (word.length > 1) {
                let impactWord = `<strong>${word.slice(0,(Math.floor(word.length/2)))}</strong>`
                let mainWord = word.split(word.slice(0,(Math.floor(word.length/2))))[1]
                
                let bionicWord = impactWord+mainWord
                finalString = finalString + bionicWord + " "

            } else {
                finalString = finalString + word + " "
            }
        }
        
        res.json({"bionicRead": finalString})
    } else {
        res.json("No Data In Request")
    }
})

app.listen(3000, ()=> {
    console.log("Server Started at 3000")
})